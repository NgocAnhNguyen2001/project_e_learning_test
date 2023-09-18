// chakra imports
import type { NextPage } from "next";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { ChallengeLayout } from "@/layouts/ChallengeLayout";


const Element: NextPage = () => {
  return (
    <ChallengeLayout />
  );
};

export default withAuthenticated(withApollo(Element));
