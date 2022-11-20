import React from "react";
import { Link } from "react-router-dom";

import BusinessCard from "./BusinessCard";
import Spinner from "../Common/Spinner";

const AllBusinesses = ({
  businessData,
  businessDeleted,
  currentPage,
  history,
}) => {
  if (businessData !== null && businessData.length > 0) {
    return (
      <div className="card-group justify-content-center">
        {businessData.map(({ id, name, email, phoneNumber }) => (
          <BusinessCard
            key={id}
            id={id}
            name={name}
            email={email}
            phoneNumber={phoneNumber}
            fetchUpdatedData={businessDeleted}
          />
        ))}
      </div>
    );
  } else if (businessData !== null && businessData.length === 0) {
    return (
      <div className="card-group justify-content-center">
        <Link to="/add-business" className="btn btn-lg btn-primary">
          Please add some businesses!
        </Link>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default AllBusinesses;
