import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { NextPage } from "next";
import React from "react";

import { useStore } from "./zustand";

/* eslint-disable */
export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(props.apolloState)}>
      <Comp />
    </ApolloProvider>
  );
};
export const getApolloClient = (
  // ctx?: any,
  initialState?: NormalizedCacheObject,
): ApolloClient<any> => {
  const accessToken = useStore((state) => state.auth?.accessToken);

  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: createUploadLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      fetch,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }),
    cache,
  });
};
