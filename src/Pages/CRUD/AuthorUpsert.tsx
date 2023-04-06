import React, { useState, useEffect } from "react";
import inputHelper from "../../Helper/inputHelper";
import { useNavigate, useParams } from "react-router-dom";
import { userModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import toastNotify from "../../Helper/toastNotify";
import withAdminAuth from "../../HOC/withAdminAuth";
import {
  useCreateAuthorMutation,
  useGetAuthorByIdQuery,
  useUpdateAuthorMutation,
} from "../../Apis/authorApi";

const authorData = {
  name: "",
  bio: "",
  createdBy: "",
};

function AuthorUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authorInputs, setAuthorInputs] = useState(authorData);
  const [createAuthor] = useCreateAuthorMutation();
  const [updateAuthor] = useUpdateAuthorMutation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data } = useGetAuthorByIdQuery(id);
  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        bio: data.result.bio,
        createdBy: userData.fullName || "null",
      };
      setAuthorInputs(tempData);
    }
  }, [data]);

  const handleAuthorInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const tempData = inputHelper(e, authorInputs);
    setAuthorInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", authorInputs.name);
    formData.append("bio", authorInputs.bio);
    formData.append("createdBy", userData.fullName || "null");

    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

    let response;
    if (id) {
      //update
      formData.append("id", id);
      response = await updateAuthor({data: formData, id});
      toastNotify("Author updated successfully!");
    } else {
      //create
      const response = await createAuthor(formData);
      toastNotify("Author created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/crud/listAuthors");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5">
      <h3 className="px-2 text-success">
        {id ? "Edit author" : "Add author"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7 offset-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={authorInputs.name}
              onChange={handleAuthorInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter bio"
              name="bio"
              value={authorInputs.bio}
              onChange={handleAuthorInput}
            ></textarea>

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
                  onClick={() => navigate("/crud/listAuthors")}
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

export default withAdminAuth(AuthorUpsert);
