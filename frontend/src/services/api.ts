import apolloClient from "@/graphql/apolloClient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gql } from "@apollo/client";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/graphql" }),
  endpoints: (builder) => ({
    me: builder.query<any, void>({
      queryFn: async () => {
        const { data } = await apolloClient.query({
          query: gql`
            query Me {
              me {
                id
                email
              }
            }
          `,
          fetchPolicy: "network-only",
        });
        return { data: data.me };
      },
    }),
    messages: builder.query<any, { receiverId: string }>({
      queryFn: async ({ receiverId }) => {
        const { data } = await apolloClient.query({
          query: gql`
            query Messages($receiverId: String!) {
              messages(receiverId: $receiverId) {
                id
                content
                senderId
                receiverId
                createdAt
              }
            }
          `,
          variables: { receiverId },
          fetchPolicy: "network-only",
        });
        return { data: data.messages };
      },
    }),
    register: builder.mutation<any, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        const { data } = await apolloClient.mutate({
          mutation: gql`
            mutation Register($email: String!, $password: String!) {
              register(email: $email, password: $password) {
                id
                email
              }
            }
          `,
          variables: { email, password },
        });
        return { data: data.register };
      },
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        const { data } = await apolloClient.mutate({
          mutation: gql`
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password)
            }
          `,
          variables: { email, password },
        });

        return { data: data.login };
      },
    }),
    sendMessage: builder.mutation<any, { receiverId: string; content: string }>(
      {
        queryFn: async ({ receiverId, content }) => {
          const { data } = await apolloClient.mutate({
            mutation: gql`
              mutation SendMessage($receiverId: String!, $content: String!) {
                sendMessage(receiverId: $receiverId, content: $content) {
                  id
                  content
                  senderId
                  receiverId
                  createdAt
                }
              }
            `,
            variables: { receiverId, content },
          });
          return { data: data.sendMessage };
        },
      }
    ),
    getUserIdByEmail: builder.query<any, { email: string }>({
      queryFn: async ({email}) => {
        const { data } = await apolloClient.query({
          query: gql`
            query getUserIdByEmail($email: String!) {
              getUserIdByEmail(email: $email)
            }
          `,
          variables: { email },
          fetchPolicy: "network-only",
        });
        return { data: data };
      },
    }),
  }),
});

export const {
  useMeQuery,
  useMessagesQuery,
  useRegisterMutation,
  useLoginMutation,
  useSendMessageMutation,
  useGetUserIdByEmailQuery,
} = api;
