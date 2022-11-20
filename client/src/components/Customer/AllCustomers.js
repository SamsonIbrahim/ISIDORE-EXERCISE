import React from "react";
import { Link } from "react-router-dom";

import CustomerCard from "./CustomerCard";
import Spinner from "../Common/Spinner";

const AllCustomers = ({
  customerData,
  customerDeleted,
  currentPage,
  history,
}) => {
  console.log("TEST :", customerData);
  if (customerData !== null && customerData.length > 0) {
    return (
      <div className="card-group justify-content-center">
        {customerData.map(({ id, name, email, phoneNumber }) => (
          <CustomerCard
            key={id}
            id={id}
            name={name}
            email={email}
            phoneNumber={phoneNumber}
            fetchUpdatedData={customerDeleted}
          />
        ))}
      </div>
    );
  } else if (customerData !== null && customerData.length === 0) {
    return (
      <div className="card-group justify-content-center">
        <Link to="/add-customer" className="btn btn-lg btn-primary">
          Please add some customers!
        </Link>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default AllCustomers;
