// chakra imports
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { CreateAvatar } from "@/layouts/AvatarLayout";

const Element: NextPage = () => {
  const router = useRouter();

  const { tab, categoryId } = router.query;

  return <CreateAvatar tab={tab as string} categoryId={categoryId as string} />;
};

export default withAuthenticated(withApollo(Element));
