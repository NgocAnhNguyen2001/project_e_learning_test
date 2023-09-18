import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { useTeacherQuery } from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

const SendbirdChat = dynamic(
  () => {
    return import("@/components/Chat/SendbirdChat");
  },
  { ssr: false },
);

import { extractHostname, getTenant, Props } from "@/utils/tenant";
export const getServerSideProps = extractHostname;

const StudentChat = ({ hostname }: Props): React.ReactElement => {
  const { data } = useTeacherQuery();

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  if (!data) return <>Loading....</>;
  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl">
          {/* Content */}
          <div className="h-full sendbird-app">
            <SendbirdChat
              nickname={`${data.me.firstName} ${data.me.lastName}`}
              userId={data.me.id}
              profileUrl={
                data.me.teacher?.photo
                  ? data.me.teacher?.photo.url
                  : "/images/avatar-placeholder.png"
              }
            />
          </div>
        </Section>
      </div>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(StudentChat));
