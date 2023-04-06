import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookSlice";
import { authApi, bookApi, categoryApi } from "../../Apis";
import { userAuthReducer } from "./userAuthSlice";
import { categoryReducer } from "./categorySlice";
import { authorReducer } from "./authorSlice";
import authorApi from "../../Apis/authorApi";

const store = configureStore({
  reducer: {
    bookStore: bookReducer,
    categoryStore: categoryReducer,
    authorStore: authorReducer,
    userAuthStore: userAuthReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(authorApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
