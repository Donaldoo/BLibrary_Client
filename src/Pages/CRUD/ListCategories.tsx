import React from "react";

import MainLoader from "../../Components/Common/MainLoader";
import { CategoryModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../Apis/categoryApi";
import { toast } from "react-toastify";
import withAdminAuth from "../../HOC/withAdminAuth";

function ListCategories() {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const handleCategoryDelete = async (id: number) => {
    toast.promise(
        deleteCategory(id),
        {
          pending: 'Processing your request...',
          success: 'Category deleted successfully 👌',
          error: 'Error encountered 🤯'
        },
        {
            theme: "dark",
        }
    )
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Categories List</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/crud/categoryUpsert")}
            >
              Add a new category
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Priority</div>
              <div className="col-2">Created At</div>
              <div className="col-2">Created By</div>
              <div className="col-1">Action</div>
            </div>

            {data.result.map((category: CategoryModel) => {
              return (
                <div className="row border" key={category.id}>
                  <div className="col-1">{category.id}</div>
                  <div className="col-2">{category.name}</div>
                  <div className="col-2">{category.priority}</div>
                  <div className="col-2">{category.createdAt}</div>
                  <div className="col-2">{category.createdBy}</div>
                  <div className="col-1">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/crud/categoryUpsert/" + category.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCategoryDelete(category.id)}
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

export default withAdminAuth(ListCategories);
