import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_CUSTOMER, ALL_CUSTOMERS } from "../../queries/Customer";

const CustomerCard = ({
  id,
  name,
  email,
  phoneNumber,
  fetchUpdatedData,
  history,
}) => {
  const [deleteCustomer, { loading }] = useMutation(DELETE_CUSTOMER);

  console.log("TEST rrr:", id);

  const customerDeleteHandler = () => {
    deleteCustomer({
      variables: { customerId: id },
      refetchQueries: [
        { query: ALL_CUSTOMERS, variables: { limit: 6, page: 1 } },
      ],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log(res);
        fetchUpdatedData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const customerEditHandler = () => {
    history.push({
      pathname: `/edit-customer/${id}`,
      state: { customer: { id, name, email, phoneNumber } },
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
            onClick={customerEditHandler}
          >
            Edit Customer
          </button>
          <button
            className="btn btn-danger"
            onClick={customerDeleteHandler}
            disabled={loading}
          >
            Delete Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CustomerCard);
