// chakra imports
import type { NextPage } from "next";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { TeacherLayout } from '@/layouts/TeacherLayout/index';

const Element: NextPage = () => {
  return (
    <TeacherLayout></TeacherLayout>
  );
};

export default withAuthenticated(withApollo(Element));
