import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blibraryapi.azurewebsites.net/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "api/book",
      }),
      providesTags: ["Books"],
    }),

    getBookById: builder.query({
      query: (id) => ({
        url: `api/book/${id}`,
      }),
      providesTags: ["Books"],
    }),

    getCategoriesByBookId: builder.query({
      query: (id) => ({
        url: `api/Book/${id}/categories`,
      }),
    }),
    getAuthorsWithBookCount: builder.query({
      query: () => ({
        url: "authors-with-book-count",
      }),
    }),

    updateBook: builder.mutation({
      query: ({ data, id }) => ({
        url: "api/book/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    createBook: builder.mutation({
      query: (data: FormData) => ({
        url: "api/book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: "api/book/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetCategoriesByBookIdQuery,
  useGetAuthorsWithBookCountQuery,
  useUpdateBookMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
} = bookApi;
export default bookApi;
