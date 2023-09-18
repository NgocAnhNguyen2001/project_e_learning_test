import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient } from '../../utils/hooks/withApollo';































































export async function getServerPageFindManyAssessmentUser
    (options: Omit<Apollo.QueryOptions<Types.FindManyAssessmentUserQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindManyAssessmentUserQuery>({ ...options, query: Operations.FindManyAssessmentUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindManyAssessmentUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyAssessmentUserQuery, Types.FindManyAssessmentUserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindManyAssessmentUserDocument, options);
};
export type PageFindManyAssessmentUserComp = React.FC<{data?: Types.FindManyAssessmentUserQuery, error?: Apollo.ApolloError}>;
export const withPageFindManyAssessmentUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyAssessmentUserQuery, Types.FindManyAssessmentUserQueryVariables>) => (WrappedComponent:PageFindManyAssessmentUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindManyAssessmentUserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindManyAssessmentUser = {
      getServerPage: getServerPageFindManyAssessmentUser,
      withPage: withPageFindManyAssessmentUser,
      usePage: useFindManyAssessmentUser,
    }
export async function getServerPageFindOneAssessmentUser
    (options: Omit<Apollo.QueryOptions<Types.FindOneAssessmentUserQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindOneAssessmentUserQuery>({ ...options, query: Operations.FindOneAssessmentUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindOneAssessmentUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneAssessmentUserQuery, Types.FindOneAssessmentUserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindOneAssessmentUserDocument, options);
};
export type PageFindOneAssessmentUserComp = React.FC<{data?: Types.FindOneAssessmentUserQuery, error?: Apollo.ApolloError}>;
export const withPageFindOneAssessmentUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindOneAssessmentUserQuery, Types.FindOneAssessmentUserQueryVariables>) => (WrappedComponent:PageFindOneAssessmentUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindOneAssessmentUserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindOneAssessmentUser = {
      getServerPage: getServerPageFindOneAssessmentUser,
      withPage: withPageFindOneAssessmentUser,
      usePage: useFindOneAssessmentUser,
    }
export async function getServerPageAllAccessoryOptions
    (options: Omit<Apollo.QueryOptions<Types.AllAccessoryOptionsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AllAccessoryOptionsQuery>({ ...options, query: Operations.AllAccessoryOptionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAllAccessoryOptions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllAccessoryOptionsQuery, Types.AllAccessoryOptionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AllAccessoryOptionsDocument, options);
};
export type PageAllAccessoryOptionsComp = React.FC<{data?: Types.AllAccessoryOptionsQuery, error?: Apollo.ApolloError}>;
export const withPageAllAccessoryOptions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllAccessoryOptionsQuery, Types.AllAccessoryOptionsQueryVariables>) => (WrappedComponent:PageAllAccessoryOptionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AllAccessoryOptionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAllAccessoryOptions = {
      getServerPage: getServerPageAllAccessoryOptions,
      withPage: withPageAllAccessoryOptions,
      usePage: useAllAccessoryOptions,
    }
export async function getServerPageAllCharacterOptions
    (options: Omit<Apollo.QueryOptions<Types.AllCharacterOptionsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AllCharacterOptionsQuery>({ ...options, query: Operations.AllCharacterOptionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAllCharacterOptions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllCharacterOptionsQuery, Types.AllCharacterOptionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AllCharacterOptionsDocument, options);
};
export type PageAllCharacterOptionsComp = React.FC<{data?: Types.AllCharacterOptionsQuery, error?: Apollo.ApolloError}>;
export const withPageAllCharacterOptions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllCharacterOptionsQuery, Types.AllCharacterOptionsQueryVariables>) => (WrappedComponent:PageAllCharacterOptionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AllCharacterOptionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAllCharacterOptions = {
      getServerPage: getServerPageAllCharacterOptions,
      withPage: withPageAllCharacterOptions,
      usePage: useAllCharacterOptions,
    }
export async function getServerPageAccessoryOptions
    (options: Omit<Apollo.QueryOptions<Types.AccessoryOptionsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AccessoryOptionsQuery>({ ...options, query: Operations.AccessoryOptionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAccessoryOptions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AccessoryOptionsQuery, Types.AccessoryOptionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AccessoryOptionsDocument, options);
};
export type PageAccessoryOptionsComp = React.FC<{data?: Types.AccessoryOptionsQuery, error?: Apollo.ApolloError}>;
export const withPageAccessoryOptions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AccessoryOptionsQuery, Types.AccessoryOptionsQueryVariables>) => (WrappedComponent:PageAccessoryOptionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AccessoryOptionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAccessoryOptions = {
      getServerPage: getServerPageAccessoryOptions,
      withPage: withPageAccessoryOptions,
      usePage: useAccessoryOptions,
    }
export async function getServerPageCharacterOptions
    (options: Omit<Apollo.QueryOptions<Types.CharacterOptionsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CharacterOptionsQuery>({ ...options, query: Operations.CharacterOptionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCharacterOptions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CharacterOptionsQuery, Types.CharacterOptionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CharacterOptionsDocument, options);
};
export type PageCharacterOptionsComp = React.FC<{data?: Types.CharacterOptionsQuery, error?: Apollo.ApolloError}>;
export const withPageCharacterOptions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CharacterOptionsQuery, Types.CharacterOptionsQueryVariables>) => (WrappedComponent:PageCharacterOptionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CharacterOptionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCharacterOptions = {
      getServerPage: getServerPageCharacterOptions,
      withPage: withPageCharacterOptions,
      usePage: useCharacterOptions,
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
export async function getServerPageCatalogOptions
    (options: Omit<Apollo.QueryOptions<Types.CatalogOptionsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CatalogOptionsQuery>({ ...options, query: Operations.CatalogOptionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCatalogOptions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CatalogOptionsQuery, Types.CatalogOptionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CatalogOptionsDocument, options);
};
export type PageCatalogOptionsComp = React.FC<{data?: Types.CatalogOptionsQuery, error?: Apollo.ApolloError}>;
export const withPageCatalogOptions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CatalogOptionsQuery, Types.CatalogOptionsQueryVariables>) => (WrappedComponent:PageCatalogOptionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CatalogOptionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCatalogOptions = {
      getServerPage: getServerPageCatalogOptions,
      withPage: withPageCatalogOptions,
      usePage: useCatalogOptions,
    }
export async function getServerPageGetAvatar
    (options: Omit<Apollo.QueryOptions<Types.GetAvatarQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetAvatarQuery>({ ...options, query: Operations.GetAvatarDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetAvatar = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetAvatarQuery, Types.GetAvatarQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetAvatarDocument, options);
};
export type PageGetAvatarComp = React.FC<{data?: Types.GetAvatarQuery, error?: Apollo.ApolloError}>;
export const withPageGetAvatar = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetAvatarQuery, Types.GetAvatarQueryVariables>) => (WrappedComponent:PageGetAvatarComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetAvatarDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetAvatar = {
      getServerPage: getServerPageGetAvatar,
      withPage: withPageGetAvatar,
      usePage: useGetAvatar,
    }
export async function getServerPageGenerateAvatar
    (options: Omit<Apollo.QueryOptions<Types.GenerateAvatarQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GenerateAvatarQuery>({ ...options, query: Operations.GenerateAvatarDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGenerateAvatar = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GenerateAvatarQuery, Types.GenerateAvatarQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GenerateAvatarDocument, options);
};
export type PageGenerateAvatarComp = React.FC<{data?: Types.GenerateAvatarQuery, error?: Apollo.ApolloError}>;
export const withPageGenerateAvatar = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GenerateAvatarQuery, Types.GenerateAvatarQueryVariables>) => (WrappedComponent:PageGenerateAvatarComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GenerateAvatarDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGenerateAvatar = {
      getServerPage: getServerPageGenerateAvatar,
      withPage: withPageGenerateAvatar,
      usePage: useGenerateAvatar,
    }
export async function getServerPageCheckpoint
    (options: Omit<Apollo.QueryOptions<Types.CheckpointQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CheckpointQuery>({ ...options, query: Operations.CheckpointDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCheckpoint = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CheckpointQuery, Types.CheckpointQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CheckpointDocument, options);
};
export type PageCheckpointComp = React.FC<{data?: Types.CheckpointQuery, error?: Apollo.ApolloError}>;
export const withPageCheckpoint = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CheckpointQuery, Types.CheckpointQueryVariables>) => (WrappedComponent:PageCheckpointComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CheckpointDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCheckpoint = {
      getServerPage: getServerPageCheckpoint,
      withPage: withPageCheckpoint,
      usePage: useCheckpoint,
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
export async function getServerPageGetSelfEnrolledCheckpoint
    (options: Omit<Apollo.QueryOptions<Types.GetSelfEnrolledCheckpointQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetSelfEnrolledCheckpointQuery>({ ...options, query: Operations.GetSelfEnrolledCheckpointDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetSelfEnrolledCheckpoint = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetSelfEnrolledCheckpointQuery, Types.GetSelfEnrolledCheckpointQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetSelfEnrolledCheckpointDocument, options);
};
export type PageGetSelfEnrolledCheckpointComp = React.FC<{data?: Types.GetSelfEnrolledCheckpointQuery, error?: Apollo.ApolloError}>;
export const withPageGetSelfEnrolledCheckpoint = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetSelfEnrolledCheckpointQuery, Types.GetSelfEnrolledCheckpointQueryVariables>) => (WrappedComponent:PageGetSelfEnrolledCheckpointComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetSelfEnrolledCheckpointDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetSelfEnrolledCheckpoint = {
      getServerPage: getServerPageGetSelfEnrolledCheckpoint,
      withPage: withPageGetSelfEnrolledCheckpoint,
      usePage: useGetSelfEnrolledCheckpoint,
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
export async function getServerPageCategories
    (options: Omit<Apollo.QueryOptions<Types.CategoriesQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CategoriesQuery>({ ...options, query: Operations.CategoriesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCategories = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CategoriesQuery, Types.CategoriesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CategoriesDocument, options);
};
export type PageCategoriesComp = React.FC<{data?: Types.CategoriesQuery, error?: Apollo.ApolloError}>;
export const withPageCategories = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CategoriesQuery, Types.CategoriesQueryVariables>) => (WrappedComponent:PageCategoriesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CategoriesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCategories = {
      getServerPage: getServerPageCategories,
      withPage: withPageCategories,
      usePage: useCategories,
    }
export async function getServerPageCourse
    (options: Omit<Apollo.QueryOptions<Types.CourseQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CourseQuery>({ ...options, query: Operations.CourseDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCourse = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CourseQuery, Types.CourseQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CourseDocument, options);
};
export type PageCourseComp = React.FC<{data?: Types.CourseQuery, error?: Apollo.ApolloError}>;
export const withPageCourse = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CourseQuery, Types.CourseQueryVariables>) => (WrappedComponent:PageCourseComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CourseDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCourse = {
      getServerPage: getServerPageCourse,
      withPage: withPageCourse,
      usePage: useCourse,
    }
export async function getServerPageCourses
    (options: Omit<Apollo.QueryOptions<Types.CoursesQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CoursesQuery>({ ...options, query: Operations.CoursesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCourses = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CoursesQuery, Types.CoursesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CoursesDocument, options);
};
export type PageCoursesComp = React.FC<{data?: Types.CoursesQuery, error?: Apollo.ApolloError}>;
export const withPageCourses = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CoursesQuery, Types.CoursesQueryVariables>) => (WrappedComponent:PageCoursesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CoursesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCourses = {
      getServerPage: getServerPageCourses,
      withPage: withPageCourses,
      usePage: useCourses,
    }
export async function getServerPageHomeCourses
    (options: Omit<Apollo.QueryOptions<Types.HomepageCoursesQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.HomepageCoursesQuery>({ ...options, query: Operations.HomepageCoursesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useHomeCourses = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.HomepageCoursesQuery, Types.HomepageCoursesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.HomepageCoursesDocument, options);
};
export type PageHomeCoursesComp = React.FC<{data?: Types.HomepageCoursesQuery, error?: Apollo.ApolloError}>;
export const withPageHomeCourses = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.HomepageCoursesQuery, Types.HomepageCoursesQueryVariables>) => (WrappedComponent:PageHomeCoursesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.HomepageCoursesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrHomeCourses = {
      getServerPage: getServerPageHomeCourses,
      withPage: withPageHomeCourses,
      usePage: useHomeCourses,
    }
export async function getServerPageEnrolledCourseProgress
    (options: Omit<Apollo.QueryOptions<Types.EnrolledCourseProgressQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.EnrolledCourseProgressQuery>({ ...options, query: Operations.EnrolledCourseProgressDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useEnrolledCourseProgress = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EnrolledCourseProgressQuery, Types.EnrolledCourseProgressQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.EnrolledCourseProgressDocument, options);
};
export type PageEnrolledCourseProgressComp = React.FC<{data?: Types.EnrolledCourseProgressQuery, error?: Apollo.ApolloError}>;
export const withPageEnrolledCourseProgress = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EnrolledCourseProgressQuery, Types.EnrolledCourseProgressQueryVariables>) => (WrappedComponent:PageEnrolledCourseProgressComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.EnrolledCourseProgressDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrEnrolledCourseProgress = {
      getServerPage: getServerPageEnrolledCourseProgress,
      withPage: withPageEnrolledCourseProgress,
      usePage: useEnrolledCourseProgress,
    }
export async function getServerPageEnrolledCourse
    (options: Omit<Apollo.QueryOptions<Types.EnrolledCourseQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.EnrolledCourseQuery>({ ...options, query: Operations.EnrolledCourseDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useEnrolledCourse = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EnrolledCourseQuery, Types.EnrolledCourseQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.EnrolledCourseDocument, options);
};
export type PageEnrolledCourseComp = React.FC<{data?: Types.EnrolledCourseQuery, error?: Apollo.ApolloError}>;
export const withPageEnrolledCourse = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.EnrolledCourseQuery, Types.EnrolledCourseQueryVariables>) => (WrappedComponent:PageEnrolledCourseComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.EnrolledCourseDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrEnrolledCourse = {
      getServerPage: getServerPageEnrolledCourse,
      withPage: withPageEnrolledCourse,
      usePage: useEnrolledCourse,
    }
export async function getServerPageCourseWithEnrolled
    (options: Omit<Apollo.QueryOptions<Types.CourseWithEnrolledQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CourseWithEnrolledQuery>({ ...options, query: Operations.CourseWithEnrolledDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCourseWithEnrolled = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CourseWithEnrolledQuery, Types.CourseWithEnrolledQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CourseWithEnrolledDocument, options);
};
export type PageCourseWithEnrolledComp = React.FC<{data?: Types.CourseWithEnrolledQuery, error?: Apollo.ApolloError}>;
export const withPageCourseWithEnrolled = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CourseWithEnrolledQuery, Types.CourseWithEnrolledQueryVariables>) => (WrappedComponent:PageCourseWithEnrolledComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CourseWithEnrolledDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCourseWithEnrolled = {
      getServerPage: getServerPageCourseWithEnrolled,
      withPage: withPageCourseWithEnrolled,
      usePage: useCourseWithEnrolled,
    }
export async function getServerPageCoursemapPreview
    (options: Omit<Apollo.QueryOptions<Types.CoursemapPreviewQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CoursemapPreviewQuery>({ ...options, query: Operations.CoursemapPreviewDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCoursemapPreview = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CoursemapPreviewQuery, Types.CoursemapPreviewQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CoursemapPreviewDocument, options);
};
export type PageCoursemapPreviewComp = React.FC<{data?: Types.CoursemapPreviewQuery, error?: Apollo.ApolloError}>;
export const withPageCoursemapPreview = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CoursemapPreviewQuery, Types.CoursemapPreviewQueryVariables>) => (WrappedComponent:PageCoursemapPreviewComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CoursemapPreviewDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCoursemapPreview = {
      getServerPage: getServerPageCoursemapPreview,
      withPage: withPageCoursemapPreview,
      usePage: useCoursemapPreview,
    }
export async function getServerPageCountCourse
    (options: Omit<Apollo.QueryOptions<Types.CountCourseQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CountCourseQuery>({ ...options, query: Operations.CountCourseDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCountCourse = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CountCourseQuery, Types.CountCourseQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CountCourseDocument, options);
};
export type PageCountCourseComp = React.FC<{data?: Types.CountCourseQuery, error?: Apollo.ApolloError}>;
export const withPageCountCourse = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CountCourseQuery, Types.CountCourseQueryVariables>) => (WrappedComponent:PageCountCourseComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CountCourseDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCountCourse = {
      getServerPage: getServerPageCountCourse,
      withPage: withPageCountCourse,
      usePage: useCountCourse,
    }
export async function getServerPageCourseReviews
    (options: Omit<Apollo.QueryOptions<Types.CourseReviewsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CourseReviewsQuery>({ ...options, query: Operations.CourseReviewsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCourseReviews = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CourseReviewsQuery, Types.CourseReviewsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CourseReviewsDocument, options);
};
export type PageCourseReviewsComp = React.FC<{data?: Types.CourseReviewsQuery, error?: Apollo.ApolloError}>;
export const withPageCourseReviews = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CourseReviewsQuery, Types.CourseReviewsQueryVariables>) => (WrappedComponent:PageCourseReviewsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CourseReviewsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCourseReviews = {
      getServerPage: getServerPageCourseReviews,
      withPage: withPageCourseReviews,
      usePage: useCourseReviews,
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
export async function getServerPageFindManyBookmarks
    (options: Omit<Apollo.QueryOptions<Types.FindManyBookmarksQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindManyBookmarksQuery>({ ...options, query: Operations.FindManyBookmarksDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindManyBookmarks = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyBookmarksQuery, Types.FindManyBookmarksQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindManyBookmarksDocument, options);
};
export type PageFindManyBookmarksComp = React.FC<{data?: Types.FindManyBookmarksQuery, error?: Apollo.ApolloError}>;
export const withPageFindManyBookmarks = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyBookmarksQuery, Types.FindManyBookmarksQueryVariables>) => (WrappedComponent:PageFindManyBookmarksComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindManyBookmarksDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindManyBookmarks = {
      getServerPage: getServerPageFindManyBookmarks,
      withPage: withPageFindManyBookmarks,
      usePage: useFindManyBookmarks,
    }
export async function getServerPageNotificationListAllUnread
    (options: Omit<Apollo.QueryOptions<Types.NotificationListAllUnreadQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.NotificationListAllUnreadQuery>({ ...options, query: Operations.NotificationListAllUnreadDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useNotificationListAllUnread = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NotificationListAllUnreadQuery, Types.NotificationListAllUnreadQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.NotificationListAllUnreadDocument, options);
};
export type PageNotificationListAllUnreadComp = React.FC<{data?: Types.NotificationListAllUnreadQuery, error?: Apollo.ApolloError}>;
export const withPageNotificationListAllUnread = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NotificationListAllUnreadQuery, Types.NotificationListAllUnreadQueryVariables>) => (WrappedComponent:PageNotificationListAllUnreadComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.NotificationListAllUnreadDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrNotificationListAllUnread = {
      getServerPage: getServerPageNotificationListAllUnread,
      withPage: withPageNotificationListAllUnread,
      usePage: useNotificationListAllUnread,
    }
export async function getServerPageNotificationListAll
    (options: Omit<Apollo.QueryOptions<Types.NotificationListAllQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.NotificationListAllQuery>({ ...options, query: Operations.NotificationListAllDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useNotificationListAll = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NotificationListAllQuery, Types.NotificationListAllQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.NotificationListAllDocument, options);
};
export type PageNotificationListAllComp = React.FC<{data?: Types.NotificationListAllQuery, error?: Apollo.ApolloError}>;
export const withPageNotificationListAll = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.NotificationListAllQuery, Types.NotificationListAllQueryVariables>) => (WrappedComponent:PageNotificationListAllComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.NotificationListAllDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrNotificationListAll = {
      getServerPage: getServerPageNotificationListAll,
      withPage: withPageNotificationListAll,
      usePage: useNotificationListAll,
    }
export async function getServerPageStripeProducts
    (options: Omit<Apollo.QueryOptions<Types.StripeProductsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.StripeProductsQuery>({ ...options, query: Operations.StripeProductsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useStripeProducts = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.StripeProductsQuery, Types.StripeProductsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.StripeProductsDocument, options);
};
export type PageStripeProductsComp = React.FC<{data?: Types.StripeProductsQuery, error?: Apollo.ApolloError}>;
export const withPageStripeProducts = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.StripeProductsQuery, Types.StripeProductsQueryVariables>) => (WrappedComponent:PageStripeProductsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.StripeProductsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrStripeProducts = {
      getServerPage: getServerPageStripeProducts,
      withPage: withPageStripeProducts,
      usePage: useStripeProducts,
    }
export async function getServerPageCheckoutDetails
    (options: Omit<Apollo.QueryOptions<Types.CheckoutDetailsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CheckoutDetailsQuery>({ ...options, query: Operations.CheckoutDetailsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCheckoutDetails = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CheckoutDetailsQuery, Types.CheckoutDetailsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CheckoutDetailsDocument, options);
};
export type PageCheckoutDetailsComp = React.FC<{data?: Types.CheckoutDetailsQuery, error?: Apollo.ApolloError}>;
export const withPageCheckoutDetails = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CheckoutDetailsQuery, Types.CheckoutDetailsQueryVariables>) => (WrappedComponent:PageCheckoutDetailsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CheckoutDetailsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCheckoutDetails = {
      getServerPage: getServerPageCheckoutDetails,
      withPage: withPageCheckoutDetails,
      usePage: useCheckoutDetails,
    }
export async function getServerPageParentSubscriptions
    (options: Omit<Apollo.QueryOptions<Types.ParentSubscriptionsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ParentSubscriptionsQuery>({ ...options, query: Operations.ParentSubscriptionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useParentSubscriptions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ParentSubscriptionsQuery, Types.ParentSubscriptionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ParentSubscriptionsDocument, options);
};
export type PageParentSubscriptionsComp = React.FC<{data?: Types.ParentSubscriptionsQuery, error?: Apollo.ApolloError}>;
export const withPageParentSubscriptions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ParentSubscriptionsQuery, Types.ParentSubscriptionsQueryVariables>) => (WrappedComponent:PageParentSubscriptionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ParentSubscriptionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrParentSubscriptions = {
      getServerPage: getServerPageParentSubscriptions,
      withPage: withPageParentSubscriptions,
      usePage: useParentSubscriptions,
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
export async function getServerPageTeacherProfile
    (options: Omit<Apollo.QueryOptions<Types.TeacherProfileQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.TeacherProfileQuery>({ ...options, query: Operations.TeacherProfileDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useTeacherProfile = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.TeacherProfileQuery, Types.TeacherProfileQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.TeacherProfileDocument, options);
};
export type PageTeacherProfileComp = React.FC<{data?: Types.TeacherProfileQuery, error?: Apollo.ApolloError}>;
export const withPageTeacherProfile = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.TeacherProfileQuery, Types.TeacherProfileQueryVariables>) => (WrappedComponent:PageTeacherProfileComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.TeacherProfileDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrTeacherProfile = {
      getServerPage: getServerPageTeacherProfile,
      withPage: withPageTeacherProfile,
      usePage: useTeacherProfile,
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
export async function getServerPageListUsers
    (options: Omit<Apollo.QueryOptions<Types.ListUsersQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ListUsersQuery>({ ...options, query: Operations.ListUsersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useListUsers = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ListUsersQuery, Types.ListUsersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ListUsersDocument, options);
};
export type PageListUsersComp = React.FC<{data?: Types.ListUsersQuery, error?: Apollo.ApolloError}>;
export const withPageListUsers = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ListUsersQuery, Types.ListUsersQueryVariables>) => (WrappedComponent:PageListUsersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ListUsersDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrListUsers = {
      getServerPage: getServerPageListUsers,
      withPage: withPageListUsers,
      usePage: useListUsers,
    }
export async function getServerPageListFriends
    (options: Omit<Apollo.QueryOptions<Types.ListFriendsQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ListFriendsQuery>({ ...options, query: Operations.ListFriendsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useListFriends = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ListFriendsQuery, Types.ListFriendsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ListFriendsDocument, options);
};
export type PageListFriendsComp = React.FC<{data?: Types.ListFriendsQuery, error?: Apollo.ApolloError}>;
export const withPageListFriends = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ListFriendsQuery, Types.ListFriendsQueryVariables>) => (WrappedComponent:PageListFriendsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ListFriendsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrListFriends = {
      getServerPage: getServerPageListFriends,
      withPage: withPageListFriends,
      usePage: useListFriends,
    }
export async function getServerPageFindManyUsers
    (options: Omit<Apollo.QueryOptions<Types.FindManyUsersQueryVariables>, 'query'>, ctx: any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FindManyUsersQuery>({ ...options, query: Operations.FindManyUsersDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFindManyUsers = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyUsersQuery, Types.FindManyUsersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FindManyUsersDocument, options);
};
export type PageFindManyUsersComp = React.FC<{data?: Types.FindManyUsersQuery, error?: Apollo.ApolloError}>;
export const withPageFindManyUsers = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FindManyUsersQuery, Types.FindManyUsersQueryVariables>) => (WrappedComponent:PageFindManyUsersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FindManyUsersDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFindManyUsers = {
      getServerPage: getServerPageFindManyUsers,
      withPage: withPageFindManyUsers,
      usePage: useFindManyUsers,
    }