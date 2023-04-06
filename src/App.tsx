import React, { useEffect } from "react";
import { Footer, Header } from "./Components";
import { Routes, Route } from "react-router-dom";
import {
  AccessDenied,
  AuthorUpsert,
  Authors,
  BookDetails,
  BookUpsert,
  CategoryUpsert,
  Home,
  ListAuthors,
  ListBooks,
  ListCategories,
  Login,
  NotFound,
  Register,
} from "./Pages";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { userModel } from "./Interfaces";
import { setLoggedInUser } from "./Storage/Redux/userAuthSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, email, id, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, email, id, role }));
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/bookDetails/:bookId" element={<BookDetails />}></Route>
          <Route path="/authors" element={<Authors />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route path="/crud/ListBooks" element={<ListBooks />} />
          <Route path="/crud/bookUpsert" element={<BookUpsert />} />
          <Route path="/crud/bookupsert/:id" element={<BookUpsert />} />
          <Route path="/crud/categoryUpsert/:id" element={<CategoryUpsert />} />
          <Route path="/crud/categoryUpsert" element={<CategoryUpsert />} />
          <Route path="/crud/listCategories" element={<ListCategories />} />
          <Route path="/crud/listAuthors" element={<ListAuthors />} />
          <Route path="/crud/authorUpsert" element={<AuthorUpsert />} />
          <Route path="/crud/authorUpsert/:id" element={<AuthorUpsert />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
