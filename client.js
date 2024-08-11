import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.WP_GRAPHQL_URL,
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default client;