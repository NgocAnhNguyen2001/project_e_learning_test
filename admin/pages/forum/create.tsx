import type { NextPage } from "next";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { CreatePost } from "@/layouts/ForumLayout";

const Element: NextPage = () => {
  return <CreatePost />;
};

export default withAuthenticated(withApollo(Element));
