import { extractHostname, getTenant, Props } from "@/utils/tenant";
import Head from "next/head";
import React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import Courses from "../../courses/index";

const TeacherAllCourses = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  return (
    <>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <Courses hostname={hostname} />
    </>
  );
};

export default withAuthenticated(withApollo(TeacherAllCourses));

export const getServerSideProps = extractHostname;
