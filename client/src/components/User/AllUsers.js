import React from "react";
import { Link } from "react-router-dom";

import UserCard from "./UserCard";
import Spinner from "../Common/Spinner";

const AllUsers = ({ userData, userDeleted, currentPage, history }) => {
  if (userData !== null && userData.length > 0) {
    return (
      <div className="card-group justify-content-center">
        {userData.map(({ id, name, email, phoneNumber }) => (
          <UserCard
            key={id}
            id={id}
            name={name}
            email={email}
            phoneNumber={phoneNumber}
            fetchUpdatedData={userDeleted}
          />
        ))}
      </div>
    );
  } else if (userData !== null && userData.length === 0) {
    return (
      <div className="card-group justify-content-center">
        <Link to="/add-user" className="btn btn-lg btn-primary">
          Please add some users!
        </Link>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default AllUsers;
