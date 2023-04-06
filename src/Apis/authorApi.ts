import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authorApi = createApi({
  reducerPath: "authorPath",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blibraryapi.azurewebsites.net/api",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Authors"],
  endpoints: (builder) => ({
    getAuthorById: builder.query({
      query: (id) => ({
        url: `author/${id}`,
      }),
      providesTags: ["Authors"],
    }),
    getAuthors: builder.query({
      query: () => ({
        url: "author",
      }),
      providesTags: ["Authors"],
    }),
    updateAuthor: builder.mutation({
      query: ({ data, id }) => ({
        url: "author/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Authors"],
    }),

    createAuthor: builder.mutation({
      query: (formData: FormData) => ({
        url: "author",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Authors"],
    }),

    deleteAuthor: builder.mutation({
      query: (id) => ({
        url: "author/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Authors"],
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useGetAuthorByIdQuery,
  useUpdateAuthorMutation,
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
} = authorApi;
export default authorApi;
