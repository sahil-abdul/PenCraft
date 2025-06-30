import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authUser from "../appwrite/auth";
import { logIn } from "../fetures/authentication/authSlice";
import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const crateUser = async (data) => {
    try {
      setError("");
      const userData = await authUser.createAccount(data);
      if (userData) {
        const currUser = await authUser.getCurrentUser();
        if (currUser) dispatch(logIn(currUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="mx-auto w-full max-w-lg bg-[#f3d8c7] rounded-xl p-10 border">
        <div className="mb-2 flex justify-center ">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create a new Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/logIn"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* form area */}
        <form onSubmit={handleSubmit(crateUser)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full name"
              placeholder="Enter your full name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email: "
              placeholder="Enter you email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />

            <Input
              label="Password: "
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
