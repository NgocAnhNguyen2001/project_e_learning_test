import Head from "next/head";
import React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { extractHostname, getTenant, Props } from "@/utils/tenant";

import CheckpointDetails from "../../student/checkpoint/[id]";

const TeacherCheckpointPreview = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  return (
    <>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <CheckpointDetails hostname={hostname} />
    </>
  );
};

export default withAuthenticated(withApollo(TeacherCheckpointPreview));

export const getServerSideProps = extractHostname;
