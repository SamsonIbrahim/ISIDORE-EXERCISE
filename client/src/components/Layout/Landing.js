import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="dark-overlay landing-inner">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-3 title">Isidore Test</h1>
            <p className="lead">
              CRUD Application with Node, Express, MongoDB, Apollo Server,
              GraphQL, React, Apollo Client
            </p>
            <hr />
            <Link
              to="/all-businesses/1"
              className="btn btn-lg btn-primary py-2 px-4 mr-2"
            >
              See all businesses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
