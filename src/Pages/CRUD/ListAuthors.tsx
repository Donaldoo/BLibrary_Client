import MainLoader from "../../Components/Common/MainLoader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import withAdminAuth from "../../HOC/withAdminAuth";
import { useDeleteAuthorMutation, useGetAuthorsQuery } from "../../Apis/authorApi";
import { authorModel } from "../../Interfaces";

function ListAuthors() {
  const { data, isLoading } = useGetAuthorsQuery(null);
  const [deleteAuthor] = useDeleteAuthorMutation();
  const navigate = useNavigate();

  const handleAuthorDelete = async (id: number) => {
    toast.promise(
      deleteAuthor(id),
      {
        pending: "Processing your request...",
        success: "Author deleted successfully 👌",
        error: "Error encountered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Authors List</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/crud/authorUpsert")}
            >
              Add a new author
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-3">Bio</div>
              <div className="col-2">Created At</div>
              <div className="col-2">Created By</div>
              <div className="col-1">Action</div>
            </div>

            {data.result.map((author: authorModel) => {
              return (
                <div className="row border" key={author.id}>
                  <div className="col-1">{author.id}</div>
                  <div className="col-2">{author.name}</div>
                  <div className="col-3">{author.bio}</div>
                  <div className="col-2">{author.createdAt}</div>
                  <div className="col-2">{author.createdBy}</div>
                  <div className="col-1">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/crud/authorUpsert/" + author.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleAuthorDelete(author.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default withAdminAuth(ListAuthors);
