import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { Button } from "../Elements";
import { InputField } from "./InputField";
import * as z from "zod";
import {
  LoginInput,
  Role,
  useLoginMutation,
  useMeLazyQuery,
  useResendVerifyEmailMutation,
} from "schema/generated/graphql";
import { toast } from "react-toastify";
import { Feedback } from "../Feedback";
import { useRouter } from "next/router";
import { useStore } from "utils/hooks/zustand";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const AdultLogin: React.FC = () => {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const setLogin = useStore((state) => state.login);
  const setLoading = useStore((state) => state.setLoading);
  const setOnboarding = useStore((state) => state.setOnboarding);
  const [login, response] = useLoginMutation();
  const [getMe, meResponse] = useMeLazyQuery();
  const [resendEmail] = useResendVerifyEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ============EFFECTS
  React.useEffect(() => {
    const { accessToken } = router.query;
    if (!accessToken) return;
    setLogin({
      accessToken: accessToken as string,
      refreshToken: "",
    });
    getMe().then((res) => {
      if (res.data?.me) {
        const { me } = res.data;
        setOnboarding(me.role === "PARENT" && !me.onboarded);
        setUser(me);
        router.push(`/adult/home`);
      }
    });
  }, [router.query.accessToken]);

  React.useEffect(() => {
    setLoading(meResponse.loading || response.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meResponse.loading, response.loading]);

  useResultCallback(
    response,
    (login) => {
      if (!user || user.role !== "PARENT") {
        setLogin(login);
        getMe().then((res) => {
          if (res.data?.me) {
            const { me } = res.data;
            setOnboarding(me.role === "PARENT" && !me.onboarded);
            setUser(me);
            router.push(`/adult/home`);
          }
        });
      }
    },
    (err) => {
      if (err && err.message.includes("401004")) {
        resendEmail({
          variables: {
            email: getValues("email"),
          },
        })
          .then(() => {
            router.push(`/adult/auth/signup/?email=${getValues("email")}`);
          })
          .catch(() => {
            toast(
              <Feedback
                title="There's an error!"
                subtitle="Login failed!"
                type="error"
                disableFeedback={true}
              />,
              {
                progress: undefined,
                toastId: 1,
                autoClose: 3000,
              },
            );
          });
      } else if (err && err.message.includes("404001")) {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="User not found"
            type="error"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      } else {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Incorrect Password"
            type="error"
            disableFeedback={true}
            extraButton
            link="/auth/forgot"
            buttonText="Forgot password"
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 10000,
          },
        );
      }
    },
  );

  const onSubmit = async (data: LoginInput): Promise<void> => {
    try {
      await login({
        variables: {
          data: {
            email: data.email,
            password: data.password,
            role: Role.Parent,
          },
        },
      });
    } catch (err: any) {
      if (err && err.message.includes("401004")) {
        resendEmail({
          variables: {
            email: getValues("email"),
          },
        })
          .then(() => {
            router.push(`/adult/auth/signup/?email=${getValues("email")}`);
          })
          .catch(() => {
            toast(
              <Feedback
                title="There's an error!"
                subtitle="Login failed!"
                type="error"
                disableFeedback={true}
              />,
              {
                progress: undefined,
                toastId: 1,
                autoClose: 3000,
              },
            );
          });
      } else if (err && err.message.includes("404001")) {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="User not found"
            type="error"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      } else {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Incorrect Password"
            type="error"
            disableFeedback={true}
            extraButton
            link="/auth/forgot"
            buttonText="Forgot password"
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      }
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
        <div className="flex flex-col">
          <label htmlFor="email" className="">
            Email
          </label>
          <InputField
            required
            type="email"
            error={errors.email as FieldError}
            className="bg-white/25 border-none p-3 "
            errorClassName="text-[#270E67]"
            registration={{ ...register("email") }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className=" ">
            Password
          </label>
          <InputField
            required
            type="password"
            className="bg-white/25 border-none p-3 "
            errorClassName="text-[#270E67]"
            error={errors.password as FieldError}
            registration={{ ...register("password") }}
          />
        </div>
        <span className="flex justify-end underline text-[white] hover:text-sky-300">
          <Link href="/auth/forgot">Forgot password</Link>
        </span>
        <div className="py-6 flex flex-row justify-between">
          <p className="flex flex-col text-[#611651] text-md font-bold">
            Looking to join us?{"\n"}
            <span className="underline  hover:text-sky-300 text-xl">
              <Link href="/adult/auth/signup">Sign up here</Link>
            </span>
          </p>
          <Button type="submit" variant="green" className="w-1/2">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default withApollo(AdultLogin);
