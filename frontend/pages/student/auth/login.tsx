import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import { Button } from "@/components/Elements";
import { Feedback } from "@/components/Feedback";
import { InputField } from "@/components/Form";
import { NumberPasscode } from "@/components/Form/NumberPasscode";
import { AppLayout } from "@/components/Layout";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  LoginStudentInput,
  Role,
  useLoginStudentMutation,
  useMeLazyQuery,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";

const schema = z.object({
  username: z.string().min(4),
  loginPattern: z.string().length(4, "Password must be exactly 4 digits!"),
});

const StudentLogin = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
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
  // Push back to home if they are already logged in
  React.useEffect(() => {
    const { accessToken } = router.query;
    if (!accessToken && user && user.role === Role.Student) {
      router.push("/student/home");
    }
  }, []);

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

  // ============FUNCTIONS
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

  // const getPasswordIcons = (): Array<ReactElement> => {
  //   const icons = [];

  //   for (let i = 1; i <= 4; ++i) {
  //     if (watch("loginPattern")?.length >= i) {
  //       icons.push(<BsCircleFill color="white" size={25} />);
  //     } else {
  //       icons.push(<BsCircle color="white" size={25} />);
  //     }
  //   }
  //   return icons;
  // };

  // ============VIEWS
  return (
    <AppLayout hostname={hostname} darkLayout>
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div className="relative z-10 flex items-center min-h-screen py-24 lg:py-32">
        <div className="container grid grid-cols-1 px-6 mx-auto lg:space-x-24 lg:grid-cols-2 lg:px-8">
          <div className="flex justify-center">
            <div className="text-2xl font-bold text-center text-white">
              <img
                src={memoTenant.logo.landing}
                alt=""
                className="w-1/2 pb-6 mx-auto"
              />
              <p className="hidden pb-4 lg:block">Welcome Back!</p>
              <p className="hidden pb-4 lg:block">
                {"Log in to start your journey with us!"}
              </p>
              <img
                src="/images/auth/chart.png"
                alt=""
                className="hidden w-1/2 mx-auto lg:block"
              />
            </div>
          </div>
          <div className="">
            <p className="pb-4 text-3xl font-bold text-center text-white lg:text-4xl">
              Login as a Student
            </p>

            <form onSubmit={handleSubmit(onSubmit as any)}>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-white">
                  Username
                </label>
                <InputField
                  required
                  type="text"
                  // placeholder="Eg, your text here..."
                  registration={{ ...register("username") }}
                />
              </div>
              <div className="flex flex-col items-center w-full mt-4">
                <div className="flex flex-row items-center justify-center w-full mb-4">
                  <label
                    htmlFor="loginPattern"
                    className="items-start w-full text-white"
                  >
                    Password
                  </label>
                </div>
                <NumberPasscode
                  // codeOnclick={enterPassword}
                  // backSpace={backSpace}
                  // passcode={password}
                  setPasscode={setValue}
                  error={errors.loginPattern}
                  // clear={clearPassword}
                />
              </div>
              <div className="py-6">
                <div className="flex flex-col space-y-4">
                  <Button type="submit" variant="green" className="w-full">
                    Continue
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default withApollo(StudentLogin);

export const getServerSideProps = extractHostname;
