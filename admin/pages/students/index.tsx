// chakra imports
import type { NextPage } from "next";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { StudentLayout } from '@/layouts/StudentLayout/index';

const Element: NextPage = () => {
  return (
    <StudentLayout></StudentLayout>
  );
};

export default withAuthenticated(withApollo(Element));
