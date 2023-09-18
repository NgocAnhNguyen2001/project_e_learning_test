// chakra imports
import type { NextPage } from "next";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { CourseLayout } from "@/layouts/CourseLayout";


const Element: NextPage = () => {
  return (
    <CourseLayout />
  );
};

export default withAuthenticated(withApollo(Element));
