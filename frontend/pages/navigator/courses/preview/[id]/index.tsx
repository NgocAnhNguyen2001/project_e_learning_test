import { extractHostname, getTenant, Props } from "@/utils/tenant";
import Head from "next/head";
import React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import CourseDetails from "../../../../student/courses/[id]/index";

const TeacherCoursePreview = ({ hostname }: Props): React.ReactElement => {
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

export default withAuthenticated(withApollo(TeacherCoursePreview));

export const getServerSideProps = extractHostname;
