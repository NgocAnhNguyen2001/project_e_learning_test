import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient } from '../../utils/hooks/withApollo';



































export async function getServerPageFindManyAvatarAssetCatalog
    (options: Omit<Apollo.QueryOptions<Types.FindManyAvatarAssetCatalogQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindManyAvatarAssetCatalogQuery>({ ...options, query: Operations.FindManyAvatarAssetCatalogDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindManyAvatarAssetCatalog = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyAvatarAssetCatalogQuery, Types.FindManyAvatarAssetCatalogQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindManyAvatarAssetCatalogDocument, options);
};
export type PageFindManyAvatarAssetCatalogComp = React.FC<{data?: Types.FindManyAvatarAssetCatalogQuery, error?: Apollo.ApolloError}>;
export const withPageFindManyAvatarAssetCatalog = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyAvatarAssetCatalogQuery, Types.FindManyAvatarAssetCatalogQueryVariables>) => (WrappedComponent:PageFindManyAvatarAssetCatalogComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindManyAvatarAssetCatalogDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindManyAvatarAssetCatalog = {
      getServerPage: getServerPageFindManyAvatarAssetCatalog,
      withPage: withPageFindManyAvatarAssetCatalog,
      usePage: useFindManyAvatarAssetCatalog,
    }
export async function getServerPageFindManyAvatarAssetCategory
    (options: Omit<Apollo.QueryOptions<Types.FindManyAvatarAssetCategoryQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindManyAvatarAssetCategoryQuery>({ ...options, query: Operations.FindManyAvatarAssetCategoryDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindManyAvatarAssetCategory = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyAvatarAssetCategoryQuery, Types.FindManyAvatarAssetCategoryQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindManyAvatarAssetCategoryDocument, options);
};
export type PageFindManyAvatarAssetCategoryComp = React.FC<{data?: Types.FindManyAvatarAssetCategoryQuery, error?: Apollo.ApolloError}>;
export const withPageFindManyAvatarAssetCategory = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyAvatarAssetCategoryQuery, Types.FindManyAvatarAssetCategoryQueryVariables>) => (WrappedComponent:PageFindManyAvatarAssetCategoryComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindManyAvatarAssetCategoryDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindManyAvatarAssetCategory = {
      getServerPage: getServerPageFindManyAvatarAssetCategory,
      withPage: withPageFindManyAvatarAssetCategory,
      usePage: useFindManyAvatarAssetCategory,
    }
export async function getServerPageFindUniqueAvatarAssetCategory
    (options: Omit<Apollo.QueryOptions<Types.FindUniqueAvatarAssetCategoryQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindUniqueAvatarAssetCategoryQuery>({ ...options, query: Operations.FindUniqueAvatarAssetCategoryDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindUniqueAvatarAssetCategory = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindUniqueAvatarAssetCategoryQuery, Types.FindUniqueAvatarAssetCategoryQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindUniqueAvatarAssetCategoryDocument, options);
};
export type PageFindUniqueAvatarAssetCategoryComp = React.FC<{data?: Types.FindUniqueAvatarAssetCategoryQuery, error?: Apollo.ApolloError}>;
export const withPageFindUniqueAvatarAssetCategory = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindUniqueAvatarAssetCategoryQuery, Types.FindUniqueAvatarAssetCategoryQueryVariables>) => (WrappedComponent:PageFindUniqueAvatarAssetCategoryComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindUniqueAvatarAssetCategoryDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindUniqueAvatarAssetCategory = {
      getServerPage: getServerPageFindUniqueAvatarAssetCategory,
      withPage: withPageFindUniqueAvatarAssetCategory,
      usePage: useFindUniqueAvatarAssetCategory,
    }
export async function getServerPageFindUniqueAvatarAssetCatalog
    (options: Omit<Apollo.QueryOptions<Types.FindUniqueAvatarAssetCatalogQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindUniqueAvatarAssetCatalogQuery>({ ...options, query: Operations.FindUniqueAvatarAssetCatalogDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindUniqueAvatarAssetCatalog = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindUniqueAvatarAssetCatalogQuery, Types.FindUniqueAvatarAssetCatalogQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindUniqueAvatarAssetCatalogDocument, options);
};
export type PageFindUniqueAvatarAssetCatalogComp = React.FC<{data?: Types.FindUniqueAvatarAssetCatalogQuery, error?: Apollo.ApolloError}>;
export const withPageFindUniqueAvatarAssetCatalog = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindUniqueAvatarAssetCatalogQuery, Types.FindUniqueAvatarAssetCatalogQueryVariables>) => (WrappedComponent:PageFindUniqueAvatarAssetCatalogComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindUniqueAvatarAssetCatalogDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindUniqueAvatarAssetCatalog = {
      getServerPage: getServerPageFindUniqueAvatarAssetCatalog,
      withPage: withPageFindUniqueAvatarAssetCatalog,
      usePage: useFindUniqueAvatarAssetCatalog,
    }
export async function getServerPageAvatarAssetCatalogCount
    (options: Omit<Apollo.QueryOptions<Types.AvatarAssetCatalogCountQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AvatarAssetCatalogCountQuery>({ ...options, query: Operations.AvatarAssetCatalogCountDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAvatarAssetCatalogCount = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AvatarAssetCatalogCountQuery, Types.AvatarAssetCatalogCountQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AvatarAssetCatalogCountDocument, options);
};
export type PageAvatarAssetCatalogCountComp = React.FC<{data?: Types.AvatarAssetCatalogCountQuery, error?: Apollo.ApolloError}>;
export const withPageAvatarAssetCatalogCount = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AvatarAssetCatalogCountQuery, Types.AvatarAssetCatalogCountQueryVariables>) => (WrappedComponent:PageAvatarAssetCatalogCountComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AvatarAssetCatalogCountDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAvatarAssetCatalogCount = {
      getServerPage: getServerPageAvatarAssetCatalogCount,
      withPage: withPageAvatarAssetCatalogCount,
      usePage: useAvatarAssetCatalogCount,
    }
export async function getServerPageAllCatalogOptions
    (options: Omit<Apollo.QueryOptions<Types.AllCatalogOptionsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AllCatalogOptionsQuery>({ ...options, query: Operations.AllCatalogOptionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAllCatalogOptions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllCatalogOptionsQuery, Types.AllCatalogOptionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AllCatalogOptionsDocument, options);
};
export type PageAllCatalogOptionsComp = React.FC<{data?: Types.AllCatalogOptionsQuery, error?: Apollo.ApolloError}>;
export const withPageAllCatalogOptions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllCatalogOptionsQuery, Types.AllCatalogOptionsQueryVariables>) => (WrappedComponent:PageAllCatalogOptionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AllCatalogOptionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAllCatalogOptions = {
      getServerPage: getServerPageAllCatalogOptions,
      withPage: withPageAllCatalogOptions,
      usePage: useAllCatalogOptions,
    }
export async function getServerPageFindOneNormalAvatarAsset
    (options: Omit<Apollo.QueryOptions<Types.FindOneNormalAvatarAssetQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindOneNormalAvatarAssetQuery>({ ...options, query: Operations.FindOneNormalAvatarAssetDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindOneNormalAvatarAsset = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneNormalAvatarAssetQuery, Types.FindOneNormalAvatarAssetQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindOneNormalAvatarAssetDocument, options);
};
export type PageFindOneNormalAvatarAssetComp = React.FC<{data?: Types.FindOneNormalAvatarAssetQuery, error?: Apollo.ApolloError}>;
export const withPageFindOneNormalAvatarAsset = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneNormalAvatarAssetQuery, Types.FindOneNormalAvatarAssetQueryVariables>) => (WrappedComponent:PageFindOneNormalAvatarAssetComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindOneNormalAvatarAssetDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindOneNormalAvatarAsset = {
      getServerPage: getServerPageFindOneNormalAvatarAsset,
      withPage: withPageFindOneNormalAvatarAsset,
      usePage: useFindOneNormalAvatarAsset,
    }
export async function getServerPageFindOneSkinAvatarAsset
    (options: Omit<Apollo.QueryOptions<Types.FindOneSkinAvatarAssetQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindOneSkinAvatarAssetQuery>({ ...options, query: Operations.FindOneSkinAvatarAssetDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindOneSkinAvatarAsset = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneSkinAvatarAssetQuery, Types.FindOneSkinAvatarAssetQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindOneSkinAvatarAssetDocument, options);
};
export type PageFindOneSkinAvatarAssetComp = React.FC<{data?: Types.FindOneSkinAvatarAssetQuery, error?: Apollo.ApolloError}>;
export const withPageFindOneSkinAvatarAsset = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneSkinAvatarAssetQuery, Types.FindOneSkinAvatarAssetQueryVariables>) => (WrappedComponent:PageFindOneSkinAvatarAssetComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindOneSkinAvatarAssetDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindOneSkinAvatarAsset = {
      getServerPage: getServerPageFindOneSkinAvatarAsset,
      withPage: withPageFindOneSkinAvatarAsset,
      usePage: useFindOneSkinAvatarAsset,
    }
export async function getServerPageFindOneHairAvatarAsset
    (options: Omit<Apollo.QueryOptions<Types.FindOneHairAvatarAssetQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindOneHairAvatarAssetQuery>({ ...options, query: Operations.FindOneHairAvatarAssetDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindOneHairAvatarAsset = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneHairAvatarAssetQuery, Types.FindOneHairAvatarAssetQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindOneHairAvatarAssetDocument, options);
};
export type PageFindOneHairAvatarAssetComp = React.FC<{data?: Types.FindOneHairAvatarAssetQuery, error?: Apollo.ApolloError}>;
export const withPageFindOneHairAvatarAsset = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneHairAvatarAssetQuery, Types.FindOneHairAvatarAssetQueryVariables>) => (WrappedComponent:PageFindOneHairAvatarAssetComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindOneHairAvatarAssetDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindOneHairAvatarAsset = {
      getServerPage: getServerPageFindOneHairAvatarAsset,
      withPage: withPageFindOneHairAvatarAsset,
      usePage: useFindOneHairAvatarAsset,
    }
export async function getServerPageFindManyChallenges
    (options: Omit<Apollo.QueryOptions<Types.FindManyChallengesQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindManyChallengesQuery>({ ...options, query: Operations.FindManyChallengesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindManyChallenges = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyChallengesQuery, Types.FindManyChallengesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindManyChallengesDocument, options);
};
export type PageFindManyChallengesComp = React.FC<{data?: Types.FindManyChallengesQuery, error?: Apollo.ApolloError}>;
export const withPageFindManyChallenges = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyChallengesQuery, Types.FindManyChallengesQueryVariables>) => (WrappedComponent:PageFindManyChallengesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindManyChallengesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindManyChallenges = {
      getServerPage: getServerPageFindManyChallenges,
      withPage: withPageFindManyChallenges,
      usePage: useFindManyChallenges,
    }
export async function getServerPageFindOneChallenge
    (options: Omit<Apollo.QueryOptions<Types.FindOneChallengeQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindOneChallengeQuery>({ ...options, query: Operations.FindOneChallengeDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindOneChallenge = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneChallengeQuery, Types.FindOneChallengeQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindOneChallengeDocument, options);
};
export type PageFindOneChallengeComp = React.FC<{data?: Types.FindOneChallengeQuery, error?: Apollo.ApolloError}>;
export const withPageFindOneChallenge = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneChallengeQuery, Types.FindOneChallengeQueryVariables>) => (WrappedComponent:PageFindOneChallengeComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindOneChallengeDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindOneChallenge = {
      getServerPage: getServerPageFindOneChallenge,
      withPage: withPageFindOneChallenge,
      usePage: useFindOneChallenge,
    }
export async function getServerPageAdminCountChallenge
    (options: Omit<Apollo.QueryOptions<Types.AdminCountChallengeQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AdminCountChallengeQuery>({ ...options, query: Operations.AdminCountChallengeDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAdminCountChallenge = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminCountChallengeQuery, Types.AdminCountChallengeQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AdminCountChallengeDocument, options);
};
export type PageAdminCountChallengeComp = React.FC<{data?: Types.AdminCountChallengeQuery, error?: Apollo.ApolloError}>;
export const withPageAdminCountChallenge = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminCountChallengeQuery, Types.AdminCountChallengeQueryVariables>) => (WrappedComponent:PageAdminCountChallengeComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AdminCountChallengeDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAdminCountChallenge = {
      getServerPage: getServerPageAdminCountChallenge,
      withPage: withPageAdminCountChallenge,
      usePage: useAdminCountChallenge,
    }
export async function getServerPageFindChallengeComments
    (options: Omit<Apollo.QueryOptions<Types.FindChallengeCommentsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindChallengeCommentsQuery>({ ...options, query: Operations.FindChallengeCommentsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindChallengeComments = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindChallengeCommentsQuery, Types.FindChallengeCommentsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindChallengeCommentsDocument, options);
};
export type PageFindChallengeCommentsComp = React.FC<{data?: Types.FindChallengeCommentsQuery, error?: Apollo.ApolloError}>;
export const withPageFindChallengeComments = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindChallengeCommentsQuery, Types.FindChallengeCommentsQueryVariables>) => (WrappedComponent:PageFindChallengeCommentsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindChallengeCommentsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindChallengeComments = {
      getServerPage: getServerPageFindChallengeComments,
      withPage: withPageFindChallengeComments,
      usePage: useFindChallengeComments,
    }
export async function getServerPageFindManyCheckpoints
    (options: Omit<Apollo.QueryOptions<Types.FindManyCheckpointsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindManyCheckpointsQuery>({ ...options, query: Operations.FindManyCheckpointsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindManyCheckpoints = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyCheckpointsQuery, Types.FindManyCheckpointsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindManyCheckpointsDocument, options);
};
export type PageFindManyCheckpointsComp = React.FC<{data?: Types.FindManyCheckpointsQuery, error?: Apollo.ApolloError}>;
export const withPageFindManyCheckpoints = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyCheckpointsQuery, Types.FindManyCheckpointsQueryVariables>) => (WrappedComponent:PageFindManyCheckpointsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindManyCheckpointsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindManyCheckpoints = {
      getServerPage: getServerPageFindManyCheckpoints,
      withPage: withPageFindManyCheckpoints,
      usePage: useFindManyCheckpoints,
    }
export async function getServerPageFindManyCourses
    (options: Omit<Apollo.QueryOptions<Types.FindManyCoursesQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindManyCoursesQuery>({ ...options, query: Operations.FindManyCoursesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindManyCourses = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyCoursesQuery, Types.FindManyCoursesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindManyCoursesDocument, options);
};
export type PageFindManyCoursesComp = React.FC<{data?: Types.FindManyCoursesQuery, error?: Apollo.ApolloError}>;
export const withPageFindManyCourses = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyCoursesQuery, Types.FindManyCoursesQueryVariables>) => (WrappedComponent:PageFindManyCoursesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindManyCoursesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindManyCourses = {
      getServerPage: getServerPageFindManyCourses,
      withPage: withPageFindManyCourses,
      usePage: useFindManyCourses,
    }
export async function getServerPageAdminCountCourse
    (options: Omit<Apollo.QueryOptions<Types.AdminCountCourseQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AdminCountCourseQuery>({ ...options, query: Operations.AdminCountCourseDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAdminCountCourse = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminCountCourseQuery, Types.AdminCountCourseQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AdminCountCourseDocument, options);
};
export type PageAdminCountCourseComp = React.FC<{data?: Types.AdminCountCourseQuery, error?: Apollo.ApolloError}>;
export const withPageAdminCountCourse = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminCountCourseQuery, Types.AdminCountCourseQueryVariables>) => (WrappedComponent:PageAdminCountCourseComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AdminCountCourseDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAdminCountCourse = {
      getServerPage: getServerPageAdminCountCourse,
      withPage: withPageAdminCountCourse,
      usePage: useAdminCountCourse,
    }
export async function getServerPageFindUniqueCourse
    (options: Omit<Apollo.QueryOptions<Types.FindUniqueCourseQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindUniqueCourseQuery>({ ...options, query: Operations.FindUniqueCourseDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindUniqueCourse = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindUniqueCourseQuery, Types.FindUniqueCourseQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindUniqueCourseDocument, options);
};
export type PageFindUniqueCourseComp = React.FC<{data?: Types.FindUniqueCourseQuery, error?: Apollo.ApolloError}>;
export const withPageFindUniqueCourse = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindUniqueCourseQuery, Types.FindUniqueCourseQueryVariables>) => (WrappedComponent:PageFindUniqueCourseComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindUniqueCourseDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindUniqueCourse = {
      getServerPage: getServerPageFindUniqueCourse,
      withPage: withPageFindUniqueCourse,
      usePage: useFindUniqueCourse,
    }
export async function getServerPageFindAllPost
    (options: Omit<Apollo.QueryOptions<Types.FindAllPostQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindAllPostQuery>({ ...options, query: Operations.FindAllPostDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindAllPost = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindAllPostQuery, Types.FindAllPostQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindAllPostDocument, options);
};
export type PageFindAllPostComp = React.FC<{data?: Types.FindAllPostQuery, error?: Apollo.ApolloError}>;
export const withPageFindAllPost = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindAllPostQuery, Types.FindAllPostQueryVariables>) => (WrappedComponent:PageFindAllPostComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindAllPostDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindAllPost = {
      getServerPage: getServerPageFindAllPost,
      withPage: withPageFindAllPost,
      usePage: useFindAllPost,
    }
export async function getServerPageFindAllCategories
    (options: Omit<Apollo.QueryOptions<Types.FindAllCategoriesQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindAllCategoriesQuery>({ ...options, query: Operations.FindAllCategoriesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindAllCategories = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindAllCategoriesQuery, Types.FindAllCategoriesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindAllCategoriesDocument, options);
};
export type PageFindAllCategoriesComp = React.FC<{data?: Types.FindAllCategoriesQuery, error?: Apollo.ApolloError}>;
export const withPageFindAllCategories = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindAllCategoriesQuery, Types.FindAllCategoriesQueryVariables>) => (WrappedComponent:PageFindAllCategoriesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindAllCategoriesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindAllCategories = {
      getServerPage: getServerPageFindAllCategories,
      withPage: withPageFindAllCategories,
      usePage: useFindAllCategories,
    }
export async function getServerPageFindUniquePost
    (options: Omit<Apollo.QueryOptions<Types.FindUniquePostQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindUniquePostQuery>({ ...options, query: Operations.FindUniquePostDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindUniquePost = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindUniquePostQuery, Types.FindUniquePostQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindUniquePostDocument, options);
};
export type PageFindUniquePostComp = React.FC<{data?: Types.FindUniquePostQuery, error?: Apollo.ApolloError}>;
export const withPageFindUniquePost = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindUniquePostQuery, Types.FindUniquePostQueryVariables>) => (WrappedComponent:PageFindUniquePostComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindUniquePostDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindUniquePost = {
      getServerPage: getServerPageFindUniquePost,
      withPage: withPageFindUniquePost,
      usePage: useFindUniquePost,
    }
export async function getServerPageCountForumPosts
    (options: Omit<Apollo.QueryOptions<Types.CountForumPostsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CountForumPostsQuery>({ ...options, query: Operations.CountForumPostsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCountForumPosts = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CountForumPostsQuery, Types.CountForumPostsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CountForumPostsDocument, options);
};
export type PageCountForumPostsComp = React.FC<{data?: Types.CountForumPostsQuery, error?: Apollo.ApolloError}>;
export const withPageCountForumPosts = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CountForumPostsQuery, Types.CountForumPostsQueryVariables>) => (WrappedComponent:PageCountForumPostsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CountForumPostsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCountForumPosts = {
      getServerPage: getServerPageCountForumPosts,
      withPage: withPageCountForumPosts,
      usePage: useCountForumPosts,
    }
export async function getServerPageMe
    (options: Omit<Apollo.QueryOptions<Types.MeQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.MeQuery>({ ...options, query: Operations.MeDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useMe = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.MeDocument, options);
};
export type PageMeComp = React.FC<{data?: Types.MeQuery, error?: Apollo.ApolloError}>;
export const withPageMe = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) => (WrappedComponent:PageMeComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.MeDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrMe = {
      getServerPage: getServerPageMe,
      withPage: withPageMe,
      usePage: useMe,
    }
export async function getServerPageChild
    (options: Omit<Apollo.QueryOptions<Types.ChildQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ChildQuery>({ ...options, query: Operations.ChildDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useChild = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ChildQuery, Types.ChildQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ChildDocument, options);
};
export type PageChildComp = React.FC<{data?: Types.ChildQuery, error?: Apollo.ApolloError}>;
export const withPageChild = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ChildQuery, Types.ChildQueryVariables>) => (WrappedComponent:PageChildComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ChildDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrChild = {
      getServerPage: getServerPageChild,
      withPage: withPageChild,
      usePage: useChild,
    }
export async function getServerPageTeacher
    (options: Omit<Apollo.QueryOptions<Types.TeacherQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.TeacherQuery>({ ...options, query: Operations.TeacherDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useTeacher = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.TeacherQuery, Types.TeacherQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.TeacherDocument, options);
};
export type PageTeacherComp = React.FC<{data?: Types.TeacherQuery, error?: Apollo.ApolloError}>;
export const withPageTeacher = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.TeacherQuery, Types.TeacherQueryVariables>) => (WrappedComponent:PageTeacherComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.TeacherDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrTeacher = {
      getServerPage: getServerPageTeacher,
      withPage: withPageTeacher,
      usePage: useTeacher,
    }
export async function getServerPageStudent
    (options: Omit<Apollo.QueryOptions<Types.StudentQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.StudentQuery>({ ...options, query: Operations.StudentDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useStudent = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.StudentQuery, Types.StudentQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.StudentDocument, options);
};
export type PageStudentComp = React.FC<{data?: Types.StudentQuery, error?: Apollo.ApolloError}>;
export const withPageStudent = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.StudentQuery, Types.StudentQueryVariables>) => (WrappedComponent:PageStudentComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.StudentDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrStudent = {
      getServerPage: getServerPageStudent,
      withPage: withPageStudent,
      usePage: useStudent,
    }
export async function getServerPageParentReport
    (options: Omit<Apollo.QueryOptions<Types.ParentReportQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ParentReportQuery>({ ...options, query: Operations.ParentReportDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useParentReport = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ParentReportQuery, Types.ParentReportQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ParentReportDocument, options);
};
export type PageParentReportComp = React.FC<{data?: Types.ParentReportQuery, error?: Apollo.ApolloError}>;
export const withPageParentReport = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ParentReportQuery, Types.ParentReportQueryVariables>) => (WrappedComponent:PageParentReportComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ParentReportDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrParentReport = {
      getServerPage: getServerPageParentReport,
      withPage: withPageParentReport,
      usePage: useParentReport,
    }
export async function getServerPageChildReport
    (options: Omit<Apollo.QueryOptions<Types.ChildReportQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ChildReportQuery>({ ...options, query: Operations.ChildReportDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useChildReport = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ChildReportQuery, Types.ChildReportQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ChildReportDocument, options);
};
export type PageChildReportComp = React.FC<{data?: Types.ChildReportQuery, error?: Apollo.ApolloError}>;
export const withPageChildReport = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ChildReportQuery, Types.ChildReportQueryVariables>) => (WrappedComponent:PageChildReportComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ChildReportDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrChildReport = {
      getServerPage: getServerPageChildReport,
      withPage: withPageChildReport,
      usePage: useChildReport,
    }
export async function getServerPageTeacherReport
    (options: Omit<Apollo.QueryOptions<Types.TeacherReportQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.TeacherReportQuery>({ ...options, query: Operations.TeacherReportDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useTeacherReport = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.TeacherReportQuery, Types.TeacherReportQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.TeacherReportDocument, options);
};
export type PageTeacherReportComp = React.FC<{data?: Types.TeacherReportQuery, error?: Apollo.ApolloError}>;
export const withPageTeacherReport = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.TeacherReportQuery, Types.TeacherReportQueryVariables>) => (WrappedComponent:PageTeacherReportComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.TeacherReportDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrTeacherReport = {
      getServerPage: getServerPageTeacherReport,
      withPage: withPageTeacherReport,
      usePage: useTeacherReport,
    }
export async function getServerPageAdminFindUniqueUser
    (options: Omit<Apollo.QueryOptions<Types.AdminFindUniqueUserQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AdminFindUniqueUserQuery>({ ...options, query: Operations.AdminFindUniqueUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAdminFindUniqueUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminFindUniqueUserQuery, Types.AdminFindUniqueUserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AdminFindUniqueUserDocument, options);
};
export type PageAdminFindUniqueUserComp = React.FC<{data?: Types.AdminFindUniqueUserQuery, error?: Apollo.ApolloError}>;
export const withPageAdminFindUniqueUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminFindUniqueUserQuery, Types.AdminFindUniqueUserQueryVariables>) => (WrappedComponent:PageAdminFindUniqueUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AdminFindUniqueUserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAdminFindUniqueUser = {
      getServerPage: getServerPageAdminFindUniqueUser,
      withPage: withPageAdminFindUniqueUser,
      usePage: useAdminFindUniqueUser,
    }
export async function getServerPageAdminFindManyUsers
    (options: Omit<Apollo.QueryOptions<Types.AdminFindManyUsersQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AdminFindManyUsersQuery>({ ...options, query: Operations.AdminFindManyUsersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAdminFindManyUsers = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminFindManyUsersQuery, Types.AdminFindManyUsersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AdminFindManyUsersDocument, options);
};
export type PageAdminFindManyUsersComp = React.FC<{data?: Types.AdminFindManyUsersQuery, error?: Apollo.ApolloError}>;
export const withPageAdminFindManyUsers = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminFindManyUsersQuery, Types.AdminFindManyUsersQueryVariables>) => (WrappedComponent:PageAdminFindManyUsersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AdminFindManyUsersDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAdminFindManyUsers = {
      getServerPage: getServerPageAdminFindManyUsers,
      withPage: withPageAdminFindManyUsers,
      usePage: useAdminFindManyUsers,
    }
export async function getServerPageAdminCountUser
    (options: Omit<Apollo.QueryOptions<Types.AdminCountUserQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AdminCountUserQuery>({ ...options, query: Operations.AdminCountUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAdminCountUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminCountUserQuery, Types.AdminCountUserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AdminCountUserDocument, options);
};
export type PageAdminCountUserComp = React.FC<{data?: Types.AdminCountUserQuery, error?: Apollo.ApolloError}>;
export const withPageAdminCountUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AdminCountUserQuery, Types.AdminCountUserQueryVariables>) => (WrappedComponent:PageAdminCountUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AdminCountUserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAdminCountUser = {
      getServerPage: getServerPageAdminCountUser,
      withPage: withPageAdminCountUser,
      usePage: useAdminCountUser,
    }