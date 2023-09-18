import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { AppLayout } from "@/components/Layout";
import { Role } from "@/types/Auth";
import {
  useMeLazyQuery,
  useVerifyEmailMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import Head from "next/head";

const AuthForgot = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const setLogin = useStore((state) => state.login);
  const setLoading = useStore((state) => state.setLoading);

  const [success, setSuccess] = React.useState<boolean>(false);

  const [getMe, meResponse] = useMeLazyQuery();
  const [verifyEmail, response] = useVerifyEmailMutation();

  // ============EFFECTS
  React.useEffect(() => {
    setLoading(true);
  }, []);

  React.useEffect(() => {
    const verify = async (): Promise<void> => {
      try {
        await verifyEmail({
          variables: {
            token: router.query.token as string,
          },
        });
        setSuccess(true);
      } catch (err) {
        console.log(err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };
    if (router.query && router.query.token) {
      verify();
    }
  }, [router.query]);

  React.useEffect(() => {
    if (response.data) {
      setLogin(response.data.verifyEmail);
      getMe();
    }
  }, [response.data, setLogin, getMe]);

  React.useEffect(() => {
    if (meResponse.data) {
      setUser(meResponse.data.me);
    }
  }, [setUser, meResponse]);

  React.useEffect(() => {
    if (user && user.role === Role.Parent) {
      router.push("/adult/home");
    }
  }, []);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS

  // ============VIEWS
  return (
    <AppLayout darkLayout hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex flex-col justify-center min-h-screen py-12 lg:py-24">
        <div className="container max-w-lg px-6 mx-auto lg:px-8">
          {success ? (
            <div>
              <p className="pb-4 text-3xl font-bold text-center text-white font-header lg:text-4xl">
                Success
              </p>
              <p className="pb-6 text-center text-white">
                Your email is now verified!
              </p>
              <p className="pb-6 text-center text-white">
                <span className="underline text-sky-400 hover:text-sky-300">
                  <Link href="/adult/home">Back to Homepage</Link>
                </span>
              </p>
            </div>
          ) : (
            <div>
              <p className="pb-4 text-3xl font-bold text-center text-white font-header lg:text-4xl">
                Something Went Wrong
              </p>
              <p className="pb-6 text-center text-white">
                This link is not valid. Please try logging in again.
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
  );
};

export default withApollo(AuthForgot);

export const getServerSideProps = extractHostname;
