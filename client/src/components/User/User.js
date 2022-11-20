import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import AllUsers from "./AllUsers";
import { ALL_USERS } from "../../queries/User";
import Spinner from "../Common/Spinner";

function Pagination({ totalUsers, currentPage, history }) {
  if (totalUsers === 0) {
    return null;
  }

  let renderPageNumbers, firstPageItem, lastPageItem;
  const pageNumbers = [];

  const lastPage = Math.ceil(totalUsers / 6);

  const changePage = (number) => {
    history.push(`/all-users/${number}`);
  };

  for (let i = 1; i <= Math.ceil(totalUsers / 6); i++) {
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

const Users = ({ history, match: { params } }) => {
  const [users, setUsers] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data, refetch } = useQuery(ALL_USERS, {
    variables: { limit: 6, page: parseInt(params.page) },
    fetchPolicy: "no-cache",
  });

  console.log("TEST", data);

  if (data?.paginatedUsers?.users && data?.paginatedUsers?.users !== users) {
    setUsers(data.paginatedUsers.users);
    setTotalUsers(data.paginatedUsers.totalUsers);
    setLoading(false);
  }

  const userDeleteHandler = async (user) => {
    await refetch({ variables: { limit: 6, page: parseInt(params.page) } });

    if (users.length === 1 && parseInt(params.page) !== 1) {
      history.push(`/all-users/${params.page - 1}`);
    }
  };

  return (
    <div className="profiles mt-2">
      <div className="col-md-12">
        <h1 className="display-4 text-center title">Users</h1>
        <p className="lead text-center">See All Users Here</p>

        {loading ? (
          <Spinner />
        ) : (
          <div>
            <AllUsers
              userData={users}
              userDeleted={userDeleteHandler}
              currentPage={params.page}
              history={history}
            />
            <Pagination
              totalUsers={totalUsers}
              currentPage={params.page}
              history={history}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
