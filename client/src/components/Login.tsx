"use client";

import { loginUser } from "@/api/auth";
import { useUser } from "@/utils/UserContextProvider";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, useState, MouseEvent } from "react";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const { setUser } = useUser();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { token, user } = await loginUser(formValues);
    window.localStorage.setItem("token", token);
    setUser(user);
    redirect(`/user/${user.username}`);
  };

  return (
    <div className="full-screen-container">
      <div className="login-content">
        <h1 className="login-title">Login</h1>
        <form className="login-form">
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            className="login-input"
            onChange={onInputChange}
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <div className="password-container">
            <input
              type="password"
              className="login-input password-input"
              placeholder="Password"
              name="password"
              onChange={onInputChange}
            />
            <FaEyeSlash className="password-eye" />
          </div>

          <button type="submit" className="login-button" onClick={onSubmit}>
            Login
          </button>

          <Link href="/register" className="register-link">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
