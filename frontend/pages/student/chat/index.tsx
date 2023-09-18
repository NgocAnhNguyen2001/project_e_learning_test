import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { useStudentQuery } from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { extractHostname, getTenant, Props } from "@/utils/tenant";

const SendbirdChat = dynamic(
  () => {
    return import("@/components/Chat/SendbirdChat");
  },
  { ssr: false },
);

export const getServerSideProps = extractHostname;

const StudentChat = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const { data } = useStudentQuery();

  // ============EFFECTS
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  if (!data) return <>Loading....</>;

  // ============VIEWS
  return (
    <AppLayout hostname={hostname} darkLayout>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl">
          {/* Content */}
          <div className="h-full sendbird-app">
            <SendbirdChat
              theme="dark"
              nickname={data.me.student!.username}
              userId={data.me.id}
              profileUrl={
                data.me.student?.avatarImage
                  ? data.me.student.avatarImage.url
                  : "/images/common/default.png"
              }
            />
          </div>
        </Section>
      </div>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(StudentChat));
