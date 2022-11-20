import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import AllCustomers from "./AllCustomers";
import { ALL_CUSTOMERS } from "../../queries/Customer";
import Spinner from "../Common/Spinner";

function Pagination({ totalCustomers, currentPage, history }) {
  if (totalCustomers === 0) {
    return null;
  }

  let renderPageNumbers, firstPageItem, lastPageItem;
  const pageNumbers = [];

  const lastPage = Math.ceil(totalCustomers / 6);

  const changePage = (number) => {
    history.push(`/all-customers/${number}`);
  };

  for (let i = 1; i <= Math.ceil(totalCustomers / 6); i++) {
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

const Customers = ({ history, match: { params } }) => {
  const [customers, setCustomers] = useState(null);
  const [totalCustomers, setTotalCustomers] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data, refetch } = useQuery(ALL_CUSTOMERS, {
    variables: { limit: 6, page: parseInt(params.page) },
    fetchPolicy: "no-cache",
  });

  console.log("TEST", data);

  if (
    data?.paginatedCustomers?.customers &&
    data?.paginatedCustomers?.customers !== customers
  ) {
    setCustomers(data.paginatedCustomers.customers);
    setTotalCustomers(data.paginatedCustomers.totalCustomers);
    setLoading(false);
  }

  const customerDeleteHandler = async (customer) => {
    await refetch({ variables: { limit: 6, page: parseInt(params.page) } });

    if (customers.length === 1 && parseInt(params.page) !== 1) {
      // history.push(`/all-customers/${params.page - 1}`);
      history.push(`/all-customers/${params.page - 1}`);
    }
  };

  return (
    <div className="profiles mt-2">
      <div className="col-md-12">
        <h1 className="display-4 text-center title">Customers</h1>
        <p className="lead text-center">See All Customers Here</p>

        {loading ? (
          <Spinner />
        ) : (
          <div>
            <AllCustomers
              customerData={customers}
              customerDeleted={customerDeleteHandler}
              currentPage={params.page}
              history={history}
            />
            <Pagination
              totalCustomers={totalCustomers}
              currentPage={params.page}
              history={history}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
