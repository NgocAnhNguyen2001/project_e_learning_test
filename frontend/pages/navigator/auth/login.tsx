import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
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
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

const ParentLogin = ({ hostname }: Props): JSX.Element => {
  // ============ HOOKS
  const [getMe, meResponse] = useMeLazyQuery();
  const [login, response] = useLoginMutation();
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setLogin = useStore((state) => state.login);
  const setUser = useStore((state) => state.setMe);
  const setLoading = useStore((state) => state.setLoading);
  const setOnboarding = useStore((state) => state.setOnboarding);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  // ============ EFFECTS
  // Push back to home if they are already logged in
  React.useEffect(() => {
    const { accessToken } = router.query;
    if (!accessToken && user && user.role === Role.Teacher) {
      router.push("/navigator/home");
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
      if (res.data?.me) {
        const { me } = res.data;
        setUser(me);
        setOnboarding(me.role === "TEACHER" && !me.onboarded);
        const { redir } = router.query;
        if (redir) {
          const redirString = redir as string;
          const path = redirString.split("||").join("/");
          router.push(`/${path}`);
        } else {
          router.push(`/navigator/home`);
        }
      }
    });
  }, [router.query.accessToken]);

  useResultCallback(
    response,
    (login) => {
      if (!user) {
        setLogin(login);
        getMe().then((res) => {
          if (res.data?.me) {
            const { me } = res.data;
            setUser(me);
            setOnboarding(me.role === "TEACHER" && !me.onboarded);
            const { redir } = router.query;
            if (redir) {
              const redirString = redir as string;
              const path = redirString.split("||").join("/");
              router.push(`/${path}`);
            } else {
              router.push(`/navigator/home`);
            }
          }
        });
      }
    },
    () =>
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
      ),
  );

  React.useEffect(() => {
    setLoading(meResponse.loading || response.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meResponse.loading, response.loading]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  // ============ FUNCTIONS
  const onSubmit = async (data: LoginInput): Promise<void> => {
    try {
      await login({
        variables: {
          data: {
            email: data.email,
            password: data.password,
            role: Role.Teacher,
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

  // ============ VIEWS
  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div className="relative z-10 flex items-center min-h-screen py-24 lg:py-32">
        <div className="container grid grid-cols-1 px-6 mx-auto lg:space-x-24 lg:grid-cols-2 lg:px-8">
          <div className="flex justify-center">
            <div className="text-2xl text-center ">
              <img
                src={memoTenant.logo.landing}
                alt=""
                className="w-1/2 pb-6 mx-auto"
              />
              <p className="hidden pb-4 font-bold lg:block">Welcome Back!</p>
              <p className="hidden pb-4 mx-auto font-bold lg:w-2/3 lg:block">
                {
                  "With your effort, we would be able to let any kid, learn anything anywhere"
                }
              </p>
              <img
                src="/images/auth/navigator.png"
                alt=""
                className="hidden mx-auto lg:block"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="pb-6 text-3xl font-bold text-center lg:text-4xl">
              Login as a Navigator
            </p>
            {/* <p className="pb-6 text-center ">
              Looking to join us?{" "}
              <span className="underline text-sky-400 hover:text-sky-300">
                <Link href="/adult/auth/signup">Sign up here</Link>
              </span>
            </p> */}

            <form onSubmit={handleSubmit(onSubmit as any)}>
              <div className="flex flex-col">
                <label htmlFor="email" className="">
                  Email
                </label>
                <InputField
                  required
                  type="email"
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
                  registration={{ ...register("password") }}
                />
              </div>
              <span className="flex justify-end underline text-sky-400 hover:text-sky-300">
                <Link href="/auth/forgot">Forgot password</Link>
              </span>
              <div className="py-6">
                <Button
                  type="submit"
                  variant="green"
                  className={
                    "w-full " + memoTenant.backgroundClasses.passcodeButton
                  }
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default withApollo(ParentLogin);

export const getServerSideProps = extractHostname;
