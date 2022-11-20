import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto mr-auto">
          <li className="nav-item mr-3">
            <NavLink
              to="/add-customer"
              className="nav-link"
              activeClassName="active"
            >
              Add Customer
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink
              to="/all-customers/1"
              className="nav-link"
              activeClassName="active"
            >
              All Customers
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink
              to="/add-business"
              className="nav-link"
              activeClassName="active"
            >
              Add Business
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink
              to="/all-businesses/1"
              className="nav-link"
              activeClassName="active"
            >
              All Businesses
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink
              to="/add-user"
              className="nav-link"
              activeClassName="active"
            >
              Add User
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink
              to="/all-users/1"
              className="nav-link"
              activeClassName="active"
            >
              All Users
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
