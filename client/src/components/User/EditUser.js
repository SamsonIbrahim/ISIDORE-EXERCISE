import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import TextField from "../Common/TextField";
import { EDIT_USER, ALL_USERS } from "../../queries/User";

const EditUser = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  if (props?.location?.state?.user) {
    const {
      location: {
        state: { user },
      },
    } = props;
    if (name === "") {
      setName(user.name);
    }
    if (email === "") {
      setEmail(user.email);
    }
    if (phoneNumber === "") {
      setPhoneNumber(user.phoneNumber);
    }
  }

  const [editUser, { loading }] = useMutation(EDIT_USER);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length < 1) {
      setErrors({ name: "User name is required!" });
      return;
    } else if (email.trim().length < 1) {
      setErrors({ email: "User email is required!" });
      return;
    } else if (phoneNumber.trim().length < 1) {
      setErrors({ phoneNumber: "User phone number is required!" });
      return;
    } else {
      setErrors({});
    }

    editUser({
      variables: {
        userId: props?.location?.state?.user.id,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
      refetchQueries: [{ query: ALL_USERS, variables: { limit: 6, page: 1 } }],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log(res);
        props.history.push("/all-users/1");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center title">Edit Users</h1>
          <p className="lead text-center">
            Let's edit some info related to this user
          </p>
          <form onSubmit={onSubmit}>
            <TextField
              placeholder="User Name"
              name="name"
              type="text"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              error={errors.name}
              info="A name of a user"
            />
            <TextField
              placeholder="User Email"
              name="email"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              error={errors.make}
              info="A email of a user"
            />
            <TextField
              placeholder="User Phone Number"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={({ target: { value } }) => setPhoneNumber(value)}
              error={errors.phoneNumber}
              info="A phone number of a user"
            />
            <button
              type="submit"
              value="Submit"
              className="btn btn-dark btn-block mt-4"
              disabled={loading}
            >
              Submit Changes to User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
