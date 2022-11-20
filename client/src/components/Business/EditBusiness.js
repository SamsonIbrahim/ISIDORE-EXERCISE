import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import TextField from "../Common/TextField";
import { EDIT_BUSINESS, ALL_BUSINESSES } from "../../queries/Business";

const EditBusiness = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  if (props?.location?.state?.business) {
    const {
      location: {
        state: { business },
      },
    } = props;
    if (name === "") {
      setName(business.name);
    }
    if (email === "") {
      setEmail(business.email);
    }
    if (phoneNumber === "") {
      setPhoneNumber(business.phoneNumber);
    }
  }

  const [editBusiness, { loading }] = useMutation(EDIT_BUSINESS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length < 1) {
      setErrors({ name: "Business name is required!" });
      return;
    } else if (email.trim().length < 1) {
      setErrors({ email: "Business email is required!" });
      return;
    } else if (phoneNumber.trim().length < 1) {
      setErrors({ phoneNumber: "Business phone number is required!" });
      return;
    } else {
      setErrors({});
    }

    editBusiness({
      variables: {
        businessId: props.location.state.business.id,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
      refetchQueries: [
        { query: ALL_BUSINESSES, variables: { limit: 6, page: 1 } },
      ],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log(res);
        props.history.push("/all-businesses/1");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center title">Edit Business</h1>
          <p className="lead text-center">
            Let's edit some info about this business
          </p>
          <form onSubmit={onSubmit}>
            <TextField
              placeholder="Business Name"
              name="name"
              type="text"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              error={errors.name}
              info="A unique name for your business"
            />
            <TextField
              placeholder="Business Email"
              name="email"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              error={errors.make}
              info="A email of your business"
            />
            <TextField
              placeholder="Business Phone Number"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={({ target: { value } }) => setPhoneNumber(value)}
              error={errors.phoneNumber}
              info="A phone number of your business"
            />
            <button
              type="submit"
              value="Submit"
              className="btn btn-dark btn-block mt-4"
              disabled={loading}
            >
              Submit for Business Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBusiness;
