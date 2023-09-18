import type { NextPage } from "next";
import React from "react";

import { AppLayout } from "@/components/Layout";
import { withApollo } from "utils/hooks/withApollo";



const ServerErrorPage: NextPage = () => {
  return (
    <AppLayout darkLayout>
      <div className="relative z-10 flex min-h-screen py-36">
        <div className="container px-6 mx-auto lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-white text-7xl font-bold text-center lg:text-8xl text-header tracking-header">
              500
            </h1>
            <p className="text-white text-3xl font-bold text-center lg:text-4xl text-header tracking-header">
              Internal Server Error
            </p>
            <span className="text-brand-400">Please Try Again Later</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default withApollo(ServerErrorPage);
