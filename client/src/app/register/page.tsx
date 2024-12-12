"use client";

import React, { ChangeEvent, useState, MouseEvent, useContext } from "react";
import { FaEyeSlash } from "react-icons/fa";
import "./styles.css";
import { registerUser } from "@/api/auth";
import { useUser } from "@/utils/UserContextProvider";
import { redirect } from "next/navigation";

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errMessages, setErrMessages] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser } = useUser();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrMessages({ ...errMessages, [e.target.name]: "" });
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const checkConfirmPassword = () => {
    if (formValues.confirmPassword !== formValues.password) {
      setErrMessages({
        ...errMessages,
        confirmPassword: "Confirm password should match password",
      });
    }
  };

  const checkAllInputsValues = () => {
    Object.entries(formValues).forEach(([key, value]) => {
      if (value.length === 0)
        setErrMessages({
          ...errMessages,
          [key]: `The above entry must have value`,
        });
    });
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    checkConfirmPassword();
    checkAllInputsValues();

    const { username, password } = formValues;

    if (username && password) {
      const { token, user } = await registerUser({ username, password });
      window.localStorage.setItem("token", token);
      setUser(user);
      redirect(`/user/${user.username}`);
    }
  };

  return (
    <div className="full-screen-container">
      <div className="register-content">
        <h1 className="register-title">Register</h1>
        <form className="register-form">
          <label htmlFor="username" className="register-label">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            className="register-input"
            onChange={onInputChange}
          />
          <p className="error-message">{errMessages.username}</p>

          <label htmlFor="password" className="register-label">
            Password
          </label>
          <div className="password-container">
            <input
              type="password"
              className="register-input password-input"
              placeholder="Password"
              name="password"
              onChange={onInputChange}
            />
            <FaEyeSlash className="password-eye" />
          </div>
          <p className="error-message">{errMessages.password}</p>

          <label htmlFor="password" className="register-label">
            Confirm Password
          </label>
          <div className="password-container">
            <input
              type="password"
              className="register-input password-input"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={onInputChange}
            />
            <FaEyeSlash className="password-eye" />
          </div>
          <p className="error-message">{errMessages.confirmPassword}</p>

          <button type="submit" className="register-button" onClick={onSubmit}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
