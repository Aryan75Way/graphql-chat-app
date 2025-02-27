import { ApolloClient, NormalizedCacheObject, DocumentNode } from "@apollo/client";

const graphqlBaseQuery =
  (client: ApolloClient<NormalizedCacheObject>) =>
  async ({ document, variables }: { document: DocumentNode; variables?: any }) => {
    try {
      const { data } = await client.query({ query: document, variables });
      return { data };
    } catch (error) {
      return { error };
    }
  };

export default graphqlBaseQuery;