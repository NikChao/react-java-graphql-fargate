import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Coffee = {
  __typename?: 'Coffee';
  title?: Maybe<Scalars['String']['output']>;
};

export enum CoffeeType {
  Hot = 'HOT',
  Iced = 'ICED'
}

export type Filter = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  coffee?: Maybe<Array<Maybe<Coffee>>>;
  shows?: Maybe<Array<Maybe<Show>>>;
};


export type QueryCoffeeArgs = {
  type?: InputMaybe<CoffeeType>;
};


export type QueryShowsArgs = {
  filter?: InputMaybe<Filter>;
};

export type Show = {
  __typename?: 'Show';
  link?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  releaseYear?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type GetCoffeeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoffeeQuery = { __typename?: 'Query', hotCoffee?: Array<{ __typename?: 'Coffee', title?: string | null } | null> | null, icedCoffee?: Array<{ __typename?: 'Coffee', title?: string | null } | null> | null };


export const GetCoffeeDocument = gql`
    query GetCoffee {
  hotCoffee: coffee(type: HOT) {
    title
  }
  icedCoffee: coffee(type: ICED) {
    title
  }
}
    `;

/**
 * __useGetCoffeeQuery__
 *
 * To run a query within a React component, call `useGetCoffeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoffeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoffeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoffeeQuery(baseOptions?: Apollo.QueryHookOptions<GetCoffeeQuery, GetCoffeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoffeeQuery, GetCoffeeQueryVariables>(GetCoffeeDocument, options);
      }
export function useGetCoffeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoffeeQuery, GetCoffeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoffeeQuery, GetCoffeeQueryVariables>(GetCoffeeDocument, options);
        }
export function useGetCoffeeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCoffeeQuery, GetCoffeeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoffeeQuery, GetCoffeeQueryVariables>(GetCoffeeDocument, options);
        }
export type GetCoffeeQueryHookResult = ReturnType<typeof useGetCoffeeQuery>;
export type GetCoffeeLazyQueryHookResult = ReturnType<typeof useGetCoffeeLazyQuery>;
export type GetCoffeeSuspenseQueryHookResult = ReturnType<typeof useGetCoffeeSuspenseQuery>;
export type GetCoffeeQueryResult = Apollo.QueryResult<GetCoffeeQuery, GetCoffeeQueryVariables>;