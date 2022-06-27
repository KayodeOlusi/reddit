import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://idstein.stepzen.net/api/exasperated-lemur/__graphql",
  headers: {
    Authorization: `Apikey ${process.env.NEXT_STEPZEN_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;