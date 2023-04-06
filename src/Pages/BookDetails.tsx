import { Link, useParams } from "react-router-dom";
import { CategoryModel } from "../Interfaces";
import {
  useGetBookByIdQuery,
  useGetCategoriesByBookIdQuery,
} from "../Apis/bookApi";
import { useGetAuthorByIdQuery } from "../Apis/authorApi";

function BookDetails() {
  const { bookId } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(bookId);
  const { data: authorData } = useGetAuthorByIdQuery(data?.result.authorId);
  const { data: categoriesData } = useGetCategoriesByBookIdQuery(bookId);

  console.log(data);

  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <>
          <div className="row">
            <div className="col-7">
              <h1 className="text-success">{data.result.name}</h1>
              <span>
                <span
                >
                  {categoriesData?.map((category: CategoryModel) => (
                    <span
                      key={category.id}
                      className="badge text-bg-dark pt-1"
                      style={{ height: "30px", fontSize: "18px", margin: "2px"}}
                    >
                    {category.name}
                    </span>
                  ))}
                </span>
              </span>

              <p style={{ fontSize: "20px", maxWidth: "80%" }} className="pt-4 pb-4">
                {data.result.description}
              </p>


              <h3 className="text-success pt-4">
                {" "}
               {authorData?.result.name || "Loading author..."}
              </h3>
              <p style={{ fontSize: "18px"}} className="p-0">
                {data.result.createdAt}
                <br />
                Created by: {data.result.createdBy}
              </p>
              <div className="row pt-2">
                <div className="col-5 ">
                  <Link className="btn btn-secondary form-control" to="/">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-3">
              <img
                src={data.result.image}
                width="100%"
                style={{ borderRadius: "3%", height: "500px" }}
                alt="No content"
              ></img>
            </div>
          </div>
        </>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
