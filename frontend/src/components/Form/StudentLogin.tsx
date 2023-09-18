import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, FieldError } from "react-hook-form";

import * as z from "zod";
import { InputField } from "./InputField";
import { NumberPasscode } from "./NumberPasscode";
import { Button } from "../Elements/Button";
import {
  LoginStudentInput,
  useLoginStudentMutation,
  useMeLazyQuery,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import { useRouter } from "next/router";
import { useStore } from "utils/hooks/zustand";
import { toast } from "react-toastify";
import { Feedback } from "../Feedback";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { getTenant } from "@/utils/tenant";

const schema = z.object({
  username: z.string().min(4),
  loginPattern: z.string().length(4, "Password must be exactly 4 digits!"),
});

interface IStudentLogin {
  hostname?: string;
}

export const StudentLogin: React.FC<IStudentLogin> = ({ hostname }) => {
  const user = useStore((state) => state.user);
  const [getMe] = useMeLazyQuery();
  const [login, response] = useLoginStudentMutation();
  const router = useRouter();
  const setLogin = useStore((state) => state.login);
  const setUser = useStore((state) => state.setMe);
  const setLoading = useStore((state) => state.setLoading);
  const setOnboarding = useStore((state) => state.setOnboarding);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
      if (res?.data?.me) {
        const { me } = res.data;
        setUser(me);
        setLoading(false);
        setOnboarding(me.role === "STUDENT" && !me.onboarded);
        router.push(`/${me.role.toLowerCase()}/home`);
      }
    });
  }, [router.query.accessToken]);

  useResultCallback(
    response,
    (loginStudent) => {
      async function retrieveUser(): Promise<void> {
        if (!user && loginStudent) {
          setLogin(loginStudent);
          await getMe().then((res) => {
            if (res?.data?.me) {
              const { me } = res.data;
              setUser(me);
              setLoading(false);
              setOnboarding(me.role === "STUDENT" && !me.onboarded);
              router.push(`/${me.role.toLowerCase()}/home`);
            }
          });
        }
      }

      if (!user && loginStudent) {
        setLoading(true);
        retrieveUser();
      }
    },
    () => {
      // console.log(err);
    },
  );

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  const onSubmit = async (data: LoginStudentInput): Promise<void> => {
    try {
      await login({
        variables: {
          data: {
            username: data.username,
            loginPattern: data.loginPattern,
          },
        },
      });
    } catch {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Invalid login username or login pattern"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    }
  };
  console.log("passcode ", memoTenant.backgroundClasses);
  return (
    <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
      <div className="flex flex-col">
        <label htmlFor="username" className="">
          Username
        </label>
        <InputField
          required
          type="text"
          className="bg-white/25 border-none p-3 "
          error={errors.username as FieldError}
          errorClassName="text-[#270E67]"
          // placeholder="Eg, your text here..."
          registration={{ ...register("username") }}
        />
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row items-center justify-center w-full">
          <label htmlFor="loginPattern" className="items-start w-full ">
            Password
          </label>
        </div>
        <NumberPasscode
          setPasscode={setValue}
          error={errors.loginPattern}
          classnames={memoTenant.backgroundClasses.passcode}
        />
      </div>
      <div className="pb-2">
        <div className="flex flex-col space-y-1">
          <Button
            type="submit"
            variant="green"
            className={"w-full " + memoTenant.backgroundClasses.passcodeButton}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default withApollo(StudentLogin);
