import { useDeleteBookMutation, useGetBooksQuery } from "../../Apis/bookApi";
import MainLoader from "../../Components/Common/MainLoader";
import { bookModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import withAuth from "../../HOC/withAuth";
import { toast } from "react-toastify";


function ListBooks() {
  const { data, isLoading } = useGetBooksQuery(null);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();


  const handleBookDelete = async (id: number) => {
    toast.promise(
      deleteBook(id),
      {
        pending: 'Processing your request...',
        success: 'Book deleted successfully 👌',
        error: 'Error encountered 🤯'
      },
      {
          theme: "dark",
      }
    )
  }

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Books List</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/crud/bookUpsert")}
            >
              Add a new book
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Description</div>
              <div className="col-2">Created at</div>
              <div className="col-2">Created by</div>
              <div className="col-1">Action</div>
            </div>

            {data.result.map((book: bookModel) => {
              return (
                <div className="row border" key={book.id}>
                  <div className="col-1">
                    <img
                      src={book.image}
                      alt="no content"
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-1">{book.id}</div>
                  <div className="col-2">{book.name}</div>
                  <div className="col-2">{book.description}</div>
                  <div className="col-2">{book.createdAt}</div>
                  <div className="col-2">{book.createdBy}</div>
                  <div className="col-1">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() => navigate("/crud/bookUpsert/" + book.id)}
                      ></i>
                    </button>
                    <button className="btn btn-danger mx-2"
                    onClick={() => handleBookDelete(book.id)}>
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

export default withAuth(ListBooks);
