import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_BUSINESS, ALL_BUSINESSES } from "../../queries/Business";
import TextField from "../Common/TextField";

const AddBusiness = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const [addBusiness, { loading }] = useMutation(ADD_BUSINESS);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("TEST : ", name, email, phoneNumber, "sho wa si ibi bi");

    setErrors({});

    if (name.trim().length < 1) {
      setErrors({ ...errors, name: "Business name is required!" });
      return;
    }
    if (email.trim().length < 1) {
      setErrors({ ...errors, email: "Business email is required!" });
      return;
    }

    if (phoneNumber.trim().length < 1) {
      setErrors({
        ...errors,
        phoneNumber: "Business phone number is required!",
      });
      return;
    }

    console.log("TEST : ", name, email, phoneNumber, "sho wa si ibi bi 2");

    addBusiness({
      variables: { name: name, email: email, phoneNumber: phoneNumber },
      refetchQueries: [
        { query: ALL_BUSINESSES, variables: { limit: 6, page: 1 } },
      ],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log("TEST 3 :", res);
        props.history.push("/all-businesses/1");
      })
      .catch((err) => {
        console.log("TEST 4 :", err);
        console.log(JSON.stringify(err));
        if (err?.graphQLErrors[0]?.message) {
          setErrors({ name: err?.graphQLErrors[0]?.message });
        }
      });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center title">Add Business</h1>
          <p className="lead text-center">
            Let's add a new business to our graphql database
          </p>
          <form onSubmit={onSubmit}>
            <TextField
              placeholder="Business Name"
              name="name"
              type="text"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              error={errors.name}
              info="Enter a name for this business"
            />
            <TextField
              placeholder="Email"
              name="email"
              type="text"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              error={errors.email}
              info="A email of a business"
            />
            <TextField
              placeholder="Phone Number"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={({ target: { value } }) => setPhoneNumber(value)}
              error={errors.phoneNumber}
              info="A phone number of a business"
            />
            <button
              type="submit"
              value="Submit"
              className="btn btn-dark btn-block mt-4"
              disabled={loading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBusiness;
