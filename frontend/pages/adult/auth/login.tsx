import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FieldError, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";


import { Button } from "@/components/Elements";
import { Feedback } from "@/components/Feedback";
import { InputField } from "@/components/Form";
import { AppLayout } from "@/components/Layout";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  Role,
  LoginInput,
  useLoginMutation,
  useMeLazyQuery,
  useResendVerifyEmailMutation,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

const ParentLogin = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
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
    getValues,
    formState: { errors },
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

  // Push back to home if they are already logged in
  React.useEffect(() => {
    const { accessToken } = router.query;
    if (!accessToken && user && user.role === Role.Parent) {
      router.push("/adult/home");
    }
  }, []);

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

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).logo.landing;
  }, [hostname]);

  // ============FUNCTIONS
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
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Please verify your email before logging in"
            type="error"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
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

  // ============VIEWS
  return (
    <AppLayout hostname={hostname}>
      <div className="relative z-10 flex flex-col justify-center min-h-screen py-12 lg:py-24">
        <div className="container px-6 mx-auto lg:px-8">
          {/* <Link href="/">
            <a className="flex items-center group">
              <Button
                className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
                size="sm"
                variant="secondary"
              >
                <HiChevronLeft size={16} />
              </Button>
              <p className="uppercase ">Back</p>
            </a>
          </Link> */}
          <div className="grid grid-cols-1 lg:space-x-24 lg:grid-cols-2">
            <div className="flex justify-center">
              <div className="text-2xl font-bold text-center">
                <img src={memoTenant} alt="" className="w-1/2 pb-6 mx-auto" />
                <p className="hidden pb-4 lg:block">Welcome Back!</p>
                <p className="hidden pb-4 lg:block">
                  {"Let's see how your cutie is progressing."}
                </p>
                <img
                  src="/images/auth/chart.png"
                  alt=""
                  className="hidden w-1/2 mx-auto lg:block"
                />
              </div>
            </div>
            <div className="">
              <p className="pb-4 text-3xl font-bold text-center lg:text-4xl text-header tracking-header">
                Login as an Adult
              </p>
              <p className="pb-6 text-center ">
                Looking to join us?{" "}
                <span className="underline text-sky-400 hover:text-sky-300">
                  <Link href="/adult/auth/signup">Sign up here</Link>
                </span>
              </p>

              <form onSubmit={handleSubmit(onSubmit as any)}>
                <div className="flex flex-col">
                  <label htmlFor="email" className="">
                    Email
                  </label>
                  <InputField
                    required
                    type="email"
                    error={errors.email as FieldError}
                    // placeholder="Eg, your text here..."
                    registration={{ ...register("email") }}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="password" className="">
                    Password
                  </label>
                  <InputField
                    required
                    type="password"
                    error={errors.password as FieldError}
                    registration={{ ...register("password") }}
                  />
                </div>
                <span className="flex justify-end underline text-sky-400 hover:text-sky-300">
                  <Link href="/auth/forgot">Forgot password</Link>
                </span>
                <div className="py-6">
                  <Button type="submit" variant="green" className="w-auto">
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
    // </AppLayout>
  );
};

export default withApollo(ParentLogin);

export const getServerSideProps = extractHostname;
