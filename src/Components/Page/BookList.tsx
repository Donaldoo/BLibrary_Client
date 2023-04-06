import React, { useEffect } from "react";
import { bookModel } from "../../Interfaces";
import { BookCard } from ".";
import { useDispatch } from "react-redux";
import { useGetBooksQuery } from "../../Apis/bookApi";
import { setBook } from "../../Storage/Redux/bookSlice";
import MainLoader from "../Common/MainLoader";

function BookList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetBooksQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setBook(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div className="container row" style={{ paddingBottom: "100px" }}>
        {data.result.length > 0 &&
          data.result.map((book: bookModel, index: number) => (
            <BookCard book={book} key={index} />
          ))}
      </div>
    </div>
  );
}

export default BookList;
