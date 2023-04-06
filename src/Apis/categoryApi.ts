import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blibraryapi.azurewebsites.net/api",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategoryById: builder.query({
      query: (id) => ({
        url: `category/${id}`,
      }),
      providesTags: ["Categories"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "category",
      }),
      providesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: "category/" + id,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Categories"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "category",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: "category/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
export default categoryApi;
