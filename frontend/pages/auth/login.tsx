import React from "react";

import Section from "../../src/components/Elements/Section";

import { useStore } from "utils/hooks/zustand";
import { Role } from "schema/generated/graphql";
import { Button } from "@/components/Elements";
import StudentLogin from "@/components/Form/StudentLogin";
import AdultLogin from "@/components/Form/AdultLogin";
import { useRouter } from "next/router";
import { AppLayout } from "@/components/Layout/AppLayout";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { withApollo } from "utils/hooks/withApollo";
import Head from "next/head";

export const Auth: React.FC<Props> = ({ hostname }) => {
  // ============HOOKS
  const [isAdult, setIsAdult] = React.useState(false);
  const user = useStore((state) => state.user);
  const router = useRouter();

  // ============EFFECTS
  // Push back to home if they are already logged in
  React.useEffect(() => {
    const { accessToken } = router.query;
    if (!accessToken && user && user.role === Role.Student) {
      router.push("/student/home");
    }
    if (!accessToken && user && user.role === Role.Parent) {
      router.push("/adult/home");
    }
  }, []);

  React.useEffect(() => {
    if (router.query.type?.length && router.query.type == "adult") {
      setIsAdult(true);
    }
  }, [router.query.type]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  return (
    <AppLayout hostname={hostname} noFooter>
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div
        className={`h-screen text-white ${memoTenant.backgroundClasses.navbar}`}
      >
        <Section
          size="2xl"
          padding="sm"
          className="z-10 flex flex-col items-center justify-center w-full h-full"
        >
          <div className="mt-8 lg:mt-0 lg:w-2/5">
            <p className="pb-2 text-xl font-bold text-center lg:text-4xl">
              Login to {memoTenant.name} as
            </p>
            <div className="relative border-[4px] rounded-xl border-white/50 flex justify-center mb-4 p-2 gap-x-2 h-16 lg:h-20">
              <Button
                uppercase={false}
                variant={
                  !isAdult
                    ? "purple"
                    : (memoTenant.backgroundClasses.loginButtons as
                        | "transparent"
                        | "gray")
                }
                className={`border-none text-md lg:text-[28px] rounded-lg w-1/2`}
                onClick={(): void => {
                  setIsAdult(false);
                }}
              >
                Student
              </Button>
              <Button
                uppercase={false}
                variant={
                  isAdult
                    ? "purple"
                    : (memoTenant.backgroundClasses.loginButtons as
                        | "transparent"
                        | "gray")
                }
                className={`border-none text-md lg:text-[28px] rounded-lg w-1/2`}
                onClick={(): void => {
                  setIsAdult(true);
                }}
              >
                Adult
              </Button>
            </div>
            {!isAdult ? <StudentLogin hostname={hostname} /> : <AdultLogin />}
          </div>
        </Section>
      </div>
    </AppLayout>
  );
};

export default withApollo(Auth);

export const getServerSideProps = extractHostname;
