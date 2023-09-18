// chakra imports
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { AvatarLayout } from "@/layouts/AvatarLayout";

const tabs = [
  "Shoes",
  "Jacket",
  "Shirt",
  "Bottom",
  "Head",
  "Eyes",
  "Items",
  "Pets",
];

// Currently hardcoded, should be retrieved from API together with tab(categories)
const tabsId = [
  "72b4d440-3da2-4bc3-838e-385a08fddf3c",
  "dc7deb08-722b-466e-a1a0-c126ecd6e69f",
  "f3a712f1-66c1-4c2b-932c-a8b9d702e1f0",
  "23c33f7f-82c5-43cd-b8d6-4a2061b504d3",
  "727d0bf5-46e0-40ab-8c6c-3a904ebb40c9",
  "8c460d9c-2104-4115-982b-901a713c858b",
  "42d1bb0c-c741-452f-bd78-c79fcc48e328",
  "72332d03-41bf-4d3e-895d-0f8a4e92ce6a",
];

const Element: NextPage = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = React.useState(
    router.query?.tab
      ? tabs.findIndex((item) => item === `${router.query.tab as string}`)
      : 0,
  );

  return (
    <AvatarLayout
      tabs={tabs}
      tabsId={tabsId}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
    />
  );
};

export default withAuthenticated(withApollo(Element));
