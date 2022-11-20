import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_USER, ALL_USERS } from "../../queries/User";

const UserCard = ({
  id,
  name,
  email,
  phoneNumber,
  fetchUpdatedData,
  history,
}) => {
  const [deleteUser, { loading }] = useMutation(DELETE_USER);

  const userDeleteHandler = () => {
    deleteUser({
      variables: { userId: id },
      refetchQueries: [{ query: ALL_USERS, variables: { limit: 6, page: 1 } }],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log(res);
        fetchUpdatedData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const userEditHandler = () => {
    history.push({
      pathname: `/edit-user/${id}`,
      state: { user: { id, name, email, phoneNumber } },
    });
  };

  return (
    <div className="col-lg-3 col-md-4 card-width">
      <div className="card text-white bg-dark m-3 p-2 card-item">
        <div className="card-body text-center">
          <h5 className="card-title title">{name}</h5>
          <p className="card-text">{email}</p>
          <p className="card-text">{phoneNumber}</p>
          <button
            className="btn btn-primary mr-2 px-3"
            onClick={userEditHandler}
          >
            Edit User
          </button>
          <button
            className="btn btn-danger"
            onClick={userDeleteHandler}
            disabled={loading}
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserCard);
