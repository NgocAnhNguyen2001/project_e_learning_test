import { Tab } from "@headlessui/react";
import Head from "next/head";
import React from "react";

import CollapseIcon from "@/assets/CollapseIcon";
import GemInfo from "@/components/Common/gem-info";
import Section from "@/components/Elements/Section";
import { TabList } from "@/components/Elements/TabList";
import { Title } from "@/components/Elements/Title";
import { AppLayout } from "@/components/Layout";
import StoreCard from "@/components/Store/Card";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { useMeQuery } from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

const categories = [
  {
    title: "ALL",
    value: "all",
  },
  {
    title: "CHARACTER",
    value: "character",
  },
  {
    title: "ACCESSORIES",
    value: "accessories",
  },
  {
    title: "BACKGROUND",
    value: "background",
  },
  {
    title: "EFFECT",
    value: "effect",
  },
];

// TODO: Remove Placeholder item
const items = [
  {
    name: "Lion Dance Head",
    description:
      "Lion dance mimic a lion's movements in a lion costume to bring good luck and fortune.",
    hardPrice: 1000,
    softPrice: 2000,
  },
  {
    name: "Lion Dance Head",
    description:
      "Lion dance mimic a lion's movements in a lion costume to bring good luck and fortune.",
    hardPrice: 1000,
    softPrice: 2000,
  },
  {
    name: "Lion Dance Head",
    description:
      "Lion dance mimic a lion's movements in a lion costume to bring good luck and fortune.",
    hardPrice: 1000,
    softPrice: 2000,
  },
  {
    name: "Lion Dance Head",
    description:
      "Lion dance mimic a lion's movements in a lion costume to bring good luck and fortune.",
    hardPrice: 1000,
    softPrice: 2000,
  },
];

const AvatarStore = ({ hostname }: Props): React.ReactElement => {
  const { data } = useMeQuery();

  // ============HOOKS
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);
  // ============FUNCTIONS
  const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(" ");
  };

  // ============VIEWS
  return (
    <AppLayout
      hostname={hostname}
      darkLayout
      relative={data?.me.role === "PARENT"}
    >
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <img
        src="/images/avatar-store/curtain.svg"
        alt=""
        className={`${data?.me.role === "PARENT" ? "" : "pt-20"} relative`}
      />
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl" padding="sm">
          {/* Content */}
          <div className="text-center text-white">
            <Title>Avatar Store</Title>
            <p className="pt-6">Enjoy our universal selection</p>
          </div>

          <div className="mt-8">
            <Tab.Group>
              <TabList content={categories} />

              {/* <Tab.Panels className={"flex justify-center mt-8"}>
                  <Tab.Panel>Content 1</Tab.Panel>
                </Tab.Panels> */}
            </Tab.Group>

            <Tab.Group>
              {/* Subcategories */}
              <Tab.List
                className={`lg:grid flex overflow-x-auto lg:overflow-none grid-cols-9 mt-8 lg:gap-x-4 gap-x-2`}
              >
                <Tab
                  className={({ selected }): string =>
                    classNames(
                      "transition px-4 lg:px-0 duration-200 ease-in-out inline-block text-center flex-1 tracking-wide no-underline border-2 border-b-4 rounded-3xl",
                      selected
                        ? "border-brand1-500 text-brand1-500 fill-brand1-500"
                        : "border-white text-white fill-white opacity-30",
                    )
                  }
                >
                  <div className="flex flex-col items-center p-4">
                    <CollapseIcon className="" />
                    <p className={`mt-4`}>All</p>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }): string =>
                    classNames(
                      "transition px-4 lg:px-0 duration-200 ease-in-out inline-block text-center flex-1 tracking-wide no-underline border-2 border-b-4 rounded-3xl",
                      selected
                        ? "border-brand1-500 text-brand1-500 fill-brand1-500"
                        : "border-white text-white fill-white opacity-30",
                    )
                  }
                >
                  <div className="flex flex-col items-center p-4">
                    <CollapseIcon className="" />
                    <p className={`mt-4`}>All</p>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }): string =>
                    classNames(
                      "transition px-4 lg:px-0 duration-200 ease-in-out inline-block text-center flex-1 tracking-wide no-underline border-2 border-b-4 rounded-3xl",
                      selected
                        ? "border-brand1-500 text-brand1-500 fill-brand1-500"
                        : "border-white text-white fill-white opacity-30",
                    )
                  }
                >
                  <div className="flex flex-col items-center p-4">
                    <CollapseIcon className="" />
                    <p className={`mt-4`}>All</p>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }): string =>
                    classNames(
                      "transition px-4 lg:px-0 duration-200 ease-in-out inline-block text-center flex-1 tracking-wide no-underline border-2 border-b-4 rounded-3xl",
                      selected
                        ? "border-brand1-500 text-brand1-500 fill-brand1-500"
                        : "border-white text-white fill-white opacity-30",
                    )
                  }
                >
                  <div className="flex flex-col items-center p-4">
                    <CollapseIcon className="" />
                    <p className={`mt-4`}>All</p>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }): string =>
                    classNames(
                      "transition px-4 lg:px-0 duration-200 ease-in-out inline-block text-center flex-1 tracking-wide no-underline border-2 border-b-4 rounded-3xl",
                      selected
                        ? "border-brand1-500 text-brand1-500 fill-brand1-500"
                        : "border-white text-white fill-white opacity-30",
                    )
                  }
                >
                  <div className="flex flex-col items-center p-4">
                    <CollapseIcon className="" />
                    <p className={`mt-4`}>All</p>
                  </div>
                </Tab>
              </Tab.List>
            </Tab.Group>

            {/* Gems Description Only For Parents */}
            <div
              className={`${data?.me.role === "PARENT" ? "" : "hidden"} mt-12`}
            >
              <Title className="flex items-center" variant="strike">
                <img src="/images/common/gem.svg" alt="" className="mr-2" />
                Gems
              </Title>
              <div className="flex justify-center py-12">
                <p className="font-bold text-white">
                  A CTA TO TOP UP OR PROMO GOING ON
                </p>
              </div>
              <GemInfo hostname={hostname} />
            </div>
            <div className="mt-6 lg:mt-12">
              <Title className="flex items-center" variant="strike">
                <img
                  src="/images/dashboard/gear.png"
                  alt=""
                  className="mr-2 w-8 h-8"
                />
                All Year
              </Title>
              <div className="grid gap-2 mt-6 lg:mt-12 lg:grid-cols-4">
                {items.map((item, index) => {
                  return <StoreCard key={index} item={item} />;
                })}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(AvatarStore));

export const getServerSideProps = extractHostname;
