import React, { useEffect, useState } from "react";
import { CategoryModel, bookModel } from "../../Interfaces";
import { Link } from "react-router-dom";

interface Props {
  book: bookModel;
}

interface Author {
  id: number;
  name: string;
}

function BookCard(props: Props) {
 const [author, setAuthor] = useState<Author | null>(null);
 const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [props.book.id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://blibraryapi.azurewebsites.net/api/Book/${props.book.id}/categories`
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const response = await fetch(
        `https://blibraryapi.azurewebsites.net/api/author/${props.book.authorId}`
      );
      const data = await response.json();
      setAuthor(data.result);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  };

  return (
    <div className="col-md-4 col-12 p-5">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-3">
          <div className="row col-10 offset-1 p-2">
            <Link to={`/bookDetails/${props.book.id}`}>
              <img
                src={props.book.image}
                style={{
                  borderRadius: "5%",
                  objectFit: "cover",
                  height: "350px",
                }}
                alt=""
                className="w-100 mt-1 image-box"
              />
            </Link>
          </div>

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={`/bookDetails/${props.book.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                {props.book.name}
              </Link>
            </p>

            <div className="d-flex flex-wrap justify-content-center pb-3">
              {categories.map((category) => (
                <span
                  key={category.id}
                  className="badge bg-secondary m-1"
                  style={{ fontSize: "12px" }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <p
            className="card-text"
            style={{ textAlign: "center", height: "120px", overflow: "hidden" }}
          >
            {props.book.description}
          </p>
          <div className="row text-center" style={{ color: "green"}}>
            <h4>{author ? author.name : "Loading author..."}</h4>
          </div>
          <div className="text-center">
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.book.createdAt}
            </p>
            <p>Created by: {props.book.createdBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
