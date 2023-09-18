import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
  LoginInput,
  useForgotPasswordMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";

const schema = z.object({
  email: z.string().email(),
});

const AuthForgot = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const [emailSent, setEmailSent] = React.useState(false);
  const [sendEmail] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ============EFFECTS
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const onSubmit = async (data: LoginInput): Promise<void> => {
    try {
      await sendEmail({
        variables: {
          data: {
            email: data.email,
          },
        },
      }).then(() => setEmailSent(true));
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
    // <AppLayout hostname={hostname}>
    <AppLayout darkLayout hostname={hostname}>
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
          {!emailSent ? (
            <div className="">
              <p className="pb-4 text-3xl font-bold text-center text-white font-header lg:text-4xl">
                Forgot your password?
              </p>
              <p className="pb-6 text-center text-white">
                Looking to join us?{" "}
                <span className="underline text-sky-400 hover:text-sky-300">
                  <Link href="/adult/auth/signup">Sign up here</Link>
                </span>
              </p>

              <form onSubmit={handleSubmit(onSubmit as any)}>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-white">
                    Email
                  </label>
                  <InputField
                    required
                    type="email"
                    error={errors.email}
                    // placeholder="Eg, your text here..."
                    registration={{ ...register("email") }}
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
                Check your email and follow the link provided
              </p>
              <p className="pb-6 text-center text-white">
                <span className="underline text-sky-400 hover:text-sky-300">
                  <Link href="/">Back to Homepage</Link>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
    // </AppLayout>
  );
};

export default withApollo(AuthForgot);

export const getServerSideProps = extractHostname;
