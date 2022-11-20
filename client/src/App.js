import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import AddCustomer from "./components/Customer/AddCustomer";
import Customers from "./components/Customer/Customer";
import EditCustomer from "./components/Customer/EditCustomer";
import AddUser from "./components/User/AddUser";
import Users from "./components/User/User";
import EditUser from "./components/User/EditUser";
import AddBusiness from "./components/Business/AddBusiness";
import EditBusiness from "./components/Business/EditBusiness";
import Businesses from "./components/Business/Business";
import "./App.css";

const client = new ApolloClient({
  // uri: "/graphql",
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/add-customer" component={AddCustomer} />
          <Route exact path="/all-customers/:page" component={Customers} />
          <Route exact path="/edit-customer/:id" component={EditCustomer} />
          <Route exact path="/add-user" component={AddUser} />
          <Route exact path="/all-users/:page" component={Users} />
          <Route exact path="/edit-user/:id" component={EditUser} />
          <Route exact path="/add-business" component={AddBusiness} />
          <Route exact path="/all-businesses/:page" component={Businesses} />
          <Route exact path="/edit-business/:id" component={EditBusiness} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
