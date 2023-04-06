import React, { useEffect } from "react";
import { useGetAuthorsWithBookCountQuery } from "../Apis/bookApi";
import { useDispatch } from "react-redux";
import { setAuthor } from "../Storage/Redux/authorSlice";
import { AuthorCard } from "../Components/Page";
import { authorModel } from "../Interfaces";
import MainLoader from "../Components/Common/MainLoader";
import withAuth from "../HOC/withAuth";

function Authors() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAuthorsWithBookCountQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setAuthor(data));
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row mx-auto" style={{ paddingBottom: "100px"}}>
      {data.length > 0 &&
        data.map((author: authorModel, index: number) => (
          <AuthorCard author={author} key={index} />
        ))}
    </div>
  );
}

export default withAuth(Authors);
