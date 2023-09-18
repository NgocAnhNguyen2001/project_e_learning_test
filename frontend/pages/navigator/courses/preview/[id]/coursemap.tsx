import { extractHostname, getTenant, Props } from "@/utils/tenant";
import Head from "next/head";
import React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import Coursemap from "../../../../student/courses/[id]/coursemap";

const TeacherCoursemapPreview = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  return (
    <>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <Coursemap hostname={hostname} />
    </>
  );
};

export default withAuthenticated(withApollo(TeacherCoursemapPreview));

export const getServerSideProps = extractHostname;
