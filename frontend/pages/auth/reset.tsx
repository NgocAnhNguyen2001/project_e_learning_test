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
import { LoginInput, useResetPasswordMutation } from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";

const schema = z
  .object({
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const AuthReset = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [apiSuccess, setApiSuccess] = React.useState(false);

  const [resetPassword, resetPasswordResponse] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ============EFFECTS
  React.useEffect(() => {
    if (resetPasswordResponse.data) {
      let role = resetPasswordResponse.data?.resetPassword.role as string;
      if (role === "TEACHER") {
        role = "navigator";
      } else if (role === "PARENT") {
        role = "adult";
      }
      setUserRole(role);
    }
  }, [resetPasswordResponse]);

  React.useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token as string);
    }
  }, [router]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const onSubmit = async (data: LoginInput): Promise<void> => {
    try {
      await resetPassword({
        variables: {
          data: {
            token: token,
            password: data.password,
          },
        },
      }).then(() => {
        setApiSuccess(true);
      });
    } catch {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Invalid login credentials"
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

  // ============VIEWS
  return (
    <AppLayout darkLayout>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex flex-col justify-center min-h-screen py-12 lg:py-24">
        <div className="container max-w-lg px-6 mx-auto lg:px-8">
          {/* <Link href="/">
            <a className="flex items-center group">
              <Button
                className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
                size="none"
                variant="secondary"
              >
                <HiChevronLeft size={16} />
              </Button>
              <p className="text-white uppercase">Back</p>
            </a>
          </Link> */}
          {!apiSuccess ? (
            <div className="">
              <p className="pb-4 text-3xl font-bold text-center text-white font-header lg:text-4xl">
                Enter Your New Password
              </p>
              {/* <p className="pb-6 text-center text-white">
                Looking to join us?{" "}
                <span className="underline text-sky-400 hover:text-sky-300">
                  <Link href="/adult/auth/signup">Sign up here</Link>
                </span>
              </p> */}

              <form onSubmit={handleSubmit(onSubmit as any)}>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-white">
                    New Password
                  </label>
                  <InputField
                    required
                    type="password"
                    error={errors.password}
                    registration={{ ...register("password") }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-white">
                    Confirm Password
                  </label>
                  <InputField
                    required
                    type="password"
                    error={errors.confirmPassword}
                    registration={{ ...register("confirmPassword") }}
                  />
                </div>
                <div className="py-6">
                  <Button type="submit" variant="green" className="w-full">
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <p className="pb-4 text-3xl font-bold text-center text-white font-header lg:text-4xl">
                Success
              </p>
              <p className="pb-6 text-center text-white">
                Password has been successfully reset
              </p>
              <p className="pb-6 text-center text-white">
                <span className="underline text-sky-400 hover:text-sky-300">
                  <Link href={`/${userRole}/auth/login`}>Back to Login</Link>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default withApollo(AuthReset);

export const getServerSideProps = extractHostname;
