import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  adminLogin,
} from "../api/adminApi";

export default function Login() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await adminLogin({
            email,
            password,
          });

        localStorage.setItem(
          "token",
          response.token
        );

        navigate(
          "/admin"
        );

      } catch (
        error
      ) {
        alert(
          "Login failed"
        );
      }
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
    >
      <h2>
        Admin Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        type="submit"
      >
        Login
      </button>
    </form>
  );
}