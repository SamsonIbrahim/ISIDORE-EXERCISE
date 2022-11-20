import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import TextField from "../Common/TextField";

import { EDIT_CUSTOMER, ALL_CUSTOMERS } from "../../queries/Customer";

const EditCustomer = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  if (props?.location?.state?.customer) {
    const {
      location: {
        state: { customer },
      },
    } = props;
    if (name === "") {
      setName(customer.name);
    }
    if (email === "") {
      setEmail(customer.email);
    }
    if (phoneNumber === "") {
      setPhoneNumber(customer.phoneNumber);
    }
  }

  const [editCustomer, { loading }] = useMutation(EDIT_CUSTOMER);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length < 1) {
      setErrors({ name: "Customer name is required!" });
      return;
    } else if (email.trim().length < 1) {
      setErrors({ email: "Customer email is required!" });
      return;
    } else if (phoneNumber.trim().length < 1) {
      setErrors({ phoneNumber: "Customer phone number is required!" });
      return;
    } else {
      setErrors({});
    }

    editCustomer({
      variables: {
        customerId: props.location.state.customer.id,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
      refetchQueries: [
        { query: ALL_CUSTOMERS, variables: { limit: 6, page: 1 } },
      ],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log(res);
        props.history.push("/all-customers/1");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center title">Edit Customer</h1>
          <p className="lead text-center">
            Let's edit some info related to this customer
          </p>
          <form onSubmit={onSubmit}>
            <TextField
              placeholder="Customer Name"
              name="name"
              type="text"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              error={errors.name}
              info="A name of a customer"
            />
            <TextField
              placeholder="Customer Email"
              name="email"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              error={errors.make}
              info="A email of a customer"
            />
            <TextField
              placeholder="Customer Phone Number"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={({ target: { value } }) => setPhoneNumber(value)}
              error={errors.phoneNumber}
              info="A phone number of a customer"
            />
            <button
              type="submit"
              value="Submit"
              className="btn btn-dark btn-block mt-4"
              disabled={loading}
            >
              Submit Changes to Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
