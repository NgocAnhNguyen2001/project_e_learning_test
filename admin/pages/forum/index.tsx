// chakra imports
import type { NextPage } from "next";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { ForumLayout } from "@/layouts/ForumLayout";

const Element: NextPage = () => {
  return <ForumLayout />;
};

export default withAuthenticated(withApollo(Element));
