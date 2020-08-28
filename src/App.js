import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

function InputComponent(props) {
  const { className, onChange, errorText } = props;
  const { type, placeholder, id, text, value } = props.data;

  return (
    <div className={className}>
      <label htmlFor={id}>{text}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        id={id}
      />
      <FontAwesomeIcon className="icon" icon={faCheckCircle} />
      <FontAwesomeIcon className="icon" icon={faExclamationCircle} />
      <small>{errorText}</small>
    </div>
  );
}

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const setErrorFor = (input, message) => {
    switch (input) {
      case "username":
        setNameError(message);
        break;

      case "email":
        setEmailError(message);
        break;

      case "password":
        setPasswordError(message);
        break;

      case "password2":
        setConfirmPasswordError(message);
        break;

      default:
        break;
    }
  };

  const setSuccessFor = (input) => {
    switch (input) {
      case "username":
        setNameError("name");
        break;

      case "email":
        setEmailError("email");
        break;

      case "password":
        setPasswordError("password");
        break;

      case "password2":
        setConfirmPasswordError("password2");
        break;

      default:
        break;
    }
  };

  const isEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  const checkInputs = () => {
    const usernameValue = name.trim();
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const password2Value = confirmPassword.trim();

    if (usernameValue === "") {
      setErrorFor("username", "Username cannot be blank");
    } else {
      setSuccessFor("username");
    }

    if (emailValue === "") {
      setErrorFor("email", "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
      setErrorFor("email", "Not a valid email");
    } else {
      setSuccessFor("email");
    }

    if (passwordValue === "") {
      setErrorFor("password", "Password cannot be blank");
    } else {
      setSuccessFor("password");
    }

    if (password2Value === "") {
      setErrorFor("password2", "Confirm Password cannot be blank");
    } else if (password2Value !== passwordValue) {
      setErrorFor("password2", "Passwords does not match");
    } else {
      setSuccessFor("password2");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    e.persist();

    checkInputs();
  };

  const changeHandler = (e, identifier) => {
    switch (identifier) {
      case "name":
        setName(e.target.value);
        break;

      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      case "password2":
        setConfirmPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Create Account</h2>
      </div>

      <form className="form" onSubmit={submitHandler}>
        <InputComponent
          className={
            nameError === "name"
              ? "form-control success"
              : nameError !== ""
              ? "form-control error"
              : "form-control"
          }
          data={{
            type: "text",
            placeholder: "karthicktamil17",
            id: "username",
            text: "Username",
            value: name
          }}
          errorText={nameError}
          onChange={(e) => changeHandler(e, "name")}
        />
        <InputComponent
          className={
            emailError === "email"
              ? "form-control success"
              : emailError !== ""
              ? "form-control error"
              : "form-control"
          }
          data={{
            type: "email",
            placeholder: "k@karthickrajan.com",
            id: "email",
            text: "Email",
            value: email
          }}
          errorText={emailError}
          onChange={(e) => changeHandler(e, "email")}
        />
        <InputComponent
          className={
            passwordError === "password"
              ? "form-control success"
              : passwordError !== ""
              ? "form-control error"
              : "form-control"
          }
          data={{
            type: "password",
            placeholder: "Password",
            id: "password",
            text: "Password",
            value: password
          }}
          errorText={passwordError}
          onChange={(e) => changeHandler(e, "password")}
        />
        <InputComponent
          className={
            confirmPasswordError === "password2"
              ? "form-control success"
              : confirmPasswordError !== ""
              ? "form-control error"
              : "form-control"
          }
          data={{
            type: "password",
            placeholder: "Confirm Password",
            id: "password2",
            text: "Confirm Password",
            value: confirmPassword
          }}
          errorText={confirmPasswordError}
          onChange={(e) => changeHandler(e, "password2")}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
