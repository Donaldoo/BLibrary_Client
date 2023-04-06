import React, { useEffect, useState } from "react";
import inputHelper from "../../Helper/inputHelper";
import toastNotify from "../../Helper/toastNotify";
import { userModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import {
  useCreateBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../Apis/bookApi";
import { useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../Components/Common/MainLoader";
import { useGetAuthorsQuery } from "../../Apis/authorApi";
import { useGetCategoriesQuery } from "../../Apis/categoryApi";
import ReactSelect from "react-select";

const bookData = {
  name: "",
  description: "",
  createdBy: "",
  authorId: "",
  categoryId: [] as string[],
};

function BookUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookInputs, setBookInputs] = useState(bookData);
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data: authors } = useGetAuthorsQuery(null);
  const { data: categories } = useGetCategoriesQuery(null);
  const { data } = useGetBookByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        createdBy: data.result.createdBy,
        authorId: data.result.authorId,
        categoryId: Array.isArray(data.result.categoryId)
          ? data.result.categoryId
          : [],
      };
      setBookInputs(tempData);
      setImageToDisplay(data.result.image);
    }
  }, [data]);

  const handleBookInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, bookInputs);
    setBookInputs(tempData);
  };

  const handleCategoryChange = (selectedOptions: any) => {
    setBookInputs({
      ...bookInputs,
      categoryId: selectedOptions.map((option: any) => option.value),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 5000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 5 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Name", bookInputs.name);
    formData.append("Description", bookInputs.description);
    formData.append("CreatedBy", userData.fullName || "null");
    formData.append("AuthorId", bookInputs.authorId);

    if (Array.isArray(bookInputs.categoryId)) {
      bookInputs.categoryId.forEach((catId) => {
        formData.append("CategoryId", catId);
      });
    }

    if (imageToDisplay) formData.append("File", imageToStore);

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateBook({ data: formData, id });
      toastNotify("Book was updated successfully", "success");
    } else {
      //create
      response = await createBook(formData);
      toastNotify("Book was created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/crud/listBooks");
    }

    setLoading(false);
  };

  const categoryOptions = categories?.result.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));

  const authorOptions = authors?.result.map((author: any) => ({
    value: author.id,
    label: author.name,
  }));

  const handleAuthorChange = (selectedOption: any) => {
    setBookInputs({ ...bookInputs, authorId: selectedOption.value });
  };

  if (!authors || !categories) {
    return <MainLoader />;
  }

  return (
    <div className="container border mt-3 p-4 bg-light">
      {loading && <MainLoader />}
      <h3 className="offset-2 px-2 text-success">
        {id ? "Edit book" : "Add book"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-5 offset-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={bookInputs.name}
              onChange={handleBookInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              rows={10}
              name="description"
              value={bookInputs.description}
              onChange={handleBookInput}
            ></textarea>

            <ReactSelect
              className="mt-3"
              isMulti
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={bookInputs.categoryId.map((id: string) =>
                categoryOptions.find((option: any) => option.value === id)
              )}
            />
            <ReactSelect
              className="form-control mt-3"
              name="authorId"
              options={authorOptions}
              onChange={handleAuthorChange}
              value={authorOptions.find(
                (option: any) => option.value === bookInputs.authorId
              )}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/crud/listBooks")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Menu Items
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookUpsert;
