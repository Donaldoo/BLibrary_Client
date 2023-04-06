import React, { useState, useEffect } from "react";
import inputHelper from "../../Helper/inputHelper";

import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../Apis/categoryApi";
import { userModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import toastNotify from "../../Helper/toastNotify";
import withAdminAuth from "../../HOC/withAdminAuth";

const categoryData = {
  name: "",
  priority: "",
  createdBy: "",
};

function CategoryUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categoryInputs, setCategoryInputs] = useState(categoryData);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  
  const { data } = useGetCategoryByIdQuery(id);
  useEffect(()=> {
    if(data && data.result) {
      const tempData = {
        name: data.result.name,
        priority: data.result.priority,
        createdBy: userData.fullName || "null",
      };
      setCategoryInputs(tempData);
    }
  },[data])

  const handleCategoryInput = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const tempData = inputHelper(e, categoryInputs);
    setCategoryInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: categoryInputs.name,
      priority: categoryInputs.priority,
      createdBy: userData.fullName,
    };

    console.log(payload);

    let response;
    if(id){
      //update
      const updatedPayload = {...payload, id};
      const obj = {data: updatedPayload, id}
      console.log(obj)
      response = await updateCategory(obj)
      toastNotify("Category updated successfully!")
    } else {
      //create
      const response = await createCategory(payload);
      toastNotify("Category created successfully", "success")
    }


    
    if (response) {
      setLoading(false);
      navigate("/crud/listCategories");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5">
      <h3 className="px-2 text-success">
        {id ? "Edit category" : "Add category"}
      </h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7 offset-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={categoryInputs.name}
              onChange={handleCategoryInput}
            />
            <input
              className="form-control mt-3"
              placeholder="Enter priority"
              name="priority"
              value={categoryInputs.priority}
              onChange={handleCategoryInput}
            ></input>

            <div className="row">
              <div className="col-8">
                <button
                  type="submit"
                  style={{ width: "50%" }}
                  className="btn btn-success form-control mt-5"

                >
                  {id ? "update" : "Create"}
                </button>
              </div>
              <div className="col-4">
                <a
                  onClick={() => navigate("/crud/listCategories")}
                  className="btn btn-secondary form-control mt-5"
                >
                  Back to list
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default withAdminAuth(CategoryUpsert);
