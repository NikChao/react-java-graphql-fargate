 
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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


export const GetCoffeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCoffee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hotCoffee"},"name":{"kind":"Name","value":"coffee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"HOT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"icedCoffee"},"name":{"kind":"Name","value":"coffee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"ICED"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetCoffeeQuery, GetCoffeeQueryVariables>;