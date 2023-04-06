import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userModel } from "../Interfaces";
import { RootState } from "../Storage/Redux/store";
import {
  emptyUserState,
  setLoggedInUser,
} from "../Storage/Redux/userAuthSlice";
import { SD_Roles } from "../Utility/SD";
let logo = require("../Assets/Images/book.png");

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const role = userData.role;

  const isAdmin = role === "admin";
  const isauthor = role === "author";

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="nav-link" aria-current="page" to="/">
            <img src={logo} style={{ height: "40px" }} className="m-1" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              {userData.id ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/authors"
                    >
                      Report page
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {isAdmin ? "Admin panel" : "Author panel"}
                    </a>
                    <ul className="dropdown-menu">
                      {isAdmin && (
                        <>
                          <li
                            className="dropdown-item"
                            onClick={() => navigate("crud/listCategories")}
                          >
                            Categories
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => navigate("crud/listAuthors")}
                            >
                              Authors
                            </a>
                          </li>
                        </>
                      )}
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => navigate("crud/ListBooks")}
                        >
                          Books
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <></>
              )}

              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                      >
                        Welcome {userData.fullName}
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="btn btn-warning btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {!userData.id && (
                  <>
                    {" "}
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li
                      className="btn btn-warning btn-outlined rounded-pill text-white mx-2 pt-0"
                      style={{ border: "none", height: "40px", width: "100px" }}
                    >
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
