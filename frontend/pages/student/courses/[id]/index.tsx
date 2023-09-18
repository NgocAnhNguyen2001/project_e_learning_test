import { extractHostname, getTenant, Props } from "@/utils/tenant";
import Head from "next/head";
import React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import CourseDetails from "../../../courses/[id]/index";

const StudentCourseDetails = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  return (
    <>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <CourseDetails hostname={hostname} />
    </>
  );
};

export default withAuthenticated(withApollo(StudentCourseDetails));

export const getServerSideProps = extractHostname;
