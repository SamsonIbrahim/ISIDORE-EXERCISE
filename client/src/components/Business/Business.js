import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import AllBusinesses from "./AllBusinesses";
import { ALL_BUSINESSES } from "../../queries/Business";
import Spinner from "../Common/Spinner";

function Pagination({ totalBusinesses, currentPage, history }) {
  if (totalBusinesses === 0) {
    return null;
  }

  let renderPageNumbers, firstPageItem, lastPageItem;
  const pageNumbers = [];

  const lastPage = Math.ceil(totalBusinesses / 6);

  const changePage = (number) => {
    history.push(`/all-businesses/${number}`);
  };

  for (let i = 1; i <= Math.ceil(totalBusinesses / 6); i++) {
    pageNumbers.push(i);
  }

  renderPageNumbers = pageNumbers.map((number) => (
    <li key={number} className="page-item">
      <button
        className={
          parseInt(currentPage) === number
            ? "page-link btn bg-dark text-white"
            : "page-link btn text-dark"
        }
        onClick={() => changePage(number)}
      >
        {number}
      </button>
    </li>
  ));

  firstPageItem = (
    <li key={0} className="page-item">
      <button className="page-link btn text-dark" onClick={() => changePage(1)}>
        &laquo;
      </button>
    </li>
  );

  lastPageItem = (
    <li key={lastPage + 1} className="page-item">
      <button
        className="page-link btn text-dark"
        onClick={() => changePage(lastPage)}
      >
        &raquo;
      </button>
    </li>
  );

  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination-list">
        {firstPageItem}
        {renderPageNumbers}
        {lastPageItem}
      </ul>
    </div>
  );
}

const Businesses = ({ history, match: { params } }) => {
  const [businesses, setBusinesses] = useState(null);
  const [totalBusinesses, setTotalBusinesses] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data, refetch } = useQuery(ALL_BUSINESSES, {
    variables: { limit: 6, page: parseInt(params.page) },
    fetchPolicy: "no-cache",
  });

  console.log("TEST", data);

  if (
    data?.paginatedBusinesses?.businesses &&
    data?.paginatedBusinesses?.businesses !== businesses
  ) {
    setBusinesses(data.paginatedBusinesses.businesses);
    setTotalBusinesses(data.paginatedBusinesses.totalBusinesses);
    setLoading(false);
  }

  const businessDeleteHandler = async (business) => {
    await refetch({ variables: { limit: 6, page: parseInt(params.page) } });

    if (businesses.length === 1 && parseInt(params.page) !== 1) {
      history.push(`/all-businesses/${params.page - 1}`);
    }
  };

  return (
    <div className="profiles mt-2">
      <div className="col-md-12">
        <h1 className="display-4 text-center title">Businesses</h1>
        <p className="lead text-center">See All Businesses Here</p>

        {loading ? (
          <Spinner />
        ) : (
          <div>
            <AllBusinesses
              businessData={businesses}
              businessDeleted={businessDeleteHandler}
              currentPage={params.page}
              history={history}
            />
            <Pagination
              totalBusinesses={totalBusinesses}
              currentPage={params.page}
              history={history}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Businesses;
