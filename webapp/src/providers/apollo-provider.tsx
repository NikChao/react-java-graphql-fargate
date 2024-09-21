import {ApolloClient, ApolloProvider as ApolloProviderCore, HttpLink, InMemoryCache} from "@apollo/client";
import {PropsWithChildren} from "react";

// Base URL of your GraphQL server
const BASE_URL =
    process.env.NODE_ENV === 'production' ? 'https://prod-domain.com/grapqhlrn de' : 'http://localhost:8080/graphql';

// Create an HttpLink to define the base URL of your GraphQL server
const httpLink = new HttpLink({
  uri: BASE_URL,
  fetchOptions: {
    mode: 'cors', // Optional, useful for handling CORS if needed
  },
  headers: {
    authorization: localStorage.getItem('token') || '', // Example of adding an auth token
  },
});

// Initialize the Apollo Clientuar
const client = new ApolloClient({
  link: httpLink, // Set the custom HttpLink as the link
  cache: new InMemoryCache(), // Set up the cache
});

export function ApolloProvider(props: PropsWithChildren) {
    return <ApolloProviderCore client={client}>{props.children}</ApolloProviderCore>
}