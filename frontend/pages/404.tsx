import Link from "next/link";
import React from "react";

import { AppLayout } from "@/components/Layout";
import { withApollo } from "utils/hooks/withApollo";



const ErrorPage = (): JSX.Element => {
  return (
    <AppLayout darkLayout>
      <div className="relative z-10 flex min-h-screen py-36">
        <div className="container px-6 mx-auto lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-white text-7xl font-bold text-center lg:text-8xl text-header tracking-header">
              404
            </h1>
            <p className="text-white text-3xl font-bold text-center lg:text-4xl text-header tracking-header">
              Your requested page could not be found
            </p>
            <span className="underline text-sky-400 hover:text-sky-300">
              <Link href="/">Return to homepage</Link>
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default withApollo(ErrorPage);

// export const getServerSideProps = extractHostname;
