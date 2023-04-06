import { authorModel } from "../../Interfaces";

interface Props {
  author: authorModel;
}

function AuthorCard(props: Props) {
  return (
    <div
      className="container p-2 d-flex justify-content-center"
      style={{ }}
    >
      <div className="col-md-5 col-12 p-4">
        <div
          className="card"
          style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
        >
          <div className="card-body pt-0">
            <div className="text-center">
              <p className="card-title m-0 text-success fs-2 pt-4">
                {props.author.name}
              </p>
            </div>

            <p
              className="card-text pt-1"
              style={{
                textAlign: "center",
                height: "120px",
                overflow: "hidden",
              }}
            >
              {props.author.bio}
            </p>
            <div className="text-center">
              <p className="fs-5" style={{ color: "green" }}>
                Books published: {props.author.bookCount}
                <br />
                Created by: {props.author.createdBy}
              </p>
              <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
                {props.author.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorCard;
