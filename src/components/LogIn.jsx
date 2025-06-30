import React, { useState } from "react";
import { logIn as authLogIn } from "../fetures/authentication/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authUser from "../appwrite/auth";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState("");

  const run = async (data) => {
    // e.preventdefault()
    setError("");
    try {
      const session = await authUser.logIn(data);
      if (session) {
        const userData = await authUser.getCurrentUser();
        if (userData) dispatch(authLogIn(userData));
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
          SignIn to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/SignUp"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            SignUp
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* form area */}
        <form onSubmit={handleSubmit(run)} className="mt-8">
          <div className="space-y-5">
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
              placeholder= "Enter your Password"
              type="password"
              {...register("password",{
                required:true 
              })}
            />

            <Button type="submit" className="w-full">SigIn</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
