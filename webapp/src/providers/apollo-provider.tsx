import {ApolloClient, ApolloProvider as ApolloProviderCore, HttpLink, InMemoryCache} from "@apollo/client";
import {PropsWithChildren} from "react";

// Create an HttpLink to define the base URL of your GraphQL server
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql', // Base URL of your GraphQL server
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