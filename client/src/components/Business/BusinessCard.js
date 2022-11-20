import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_BUSINESS, ALL_BUSINESSES } from "../../queries/Business";

const BusinessCard = ({
  id,
  name,
  email,
  phoneNumber,
  fetchUpdatedData,
  history,
}) => {
  const [deleteBusiness, { loading }] = useMutation(DELETE_BUSINESS);

  const businessDeleteHandler = () => {
    deleteBusiness({
      variables: { businessId: id },
      refetchQueries: [
        { query: ALL_BUSINESSES, variables: { limit: 6, page: 1 } },
      ],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log(res);
        fetchUpdatedData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const businessEditHandler = () => {
    history.push({
      pathname: `/edit-business/${id}`,
      state: { business: { id, name, email, phoneNumber } },
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
            onClick={businessEditHandler}
          >
            Edit Business
          </button>
          <button
            className="btn btn-danger"
            onClick={businessDeleteHandler}
            disabled={loading}
          >
            Delete Business
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BusinessCard);
