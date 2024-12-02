import React from "react";
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input, { ExInput } from "../extras/Input";

import Button from "../extras/Button";
import { signUp } from "../../redux/slice/authSlice";
import logo from "../../assets/images/logo.png";
import { DangerRight } from "../api/toastServices";

const Registration = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    newPassword: "",
    code: "",
  });

  const isEmail = (value) => {
    const val = value === "" ? 0 : value;
    const validNumber = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
    return validNumber;
  };

  const submit = async () => {
    if (!email || !password || !code || !newPassword || !isEmail(email)) {
      let error = {};
      if (!email) error.email = "Email is required";
      if (!password) error.password = "password is required !";
      if (!newPassword) error.newPassword = "new password is required !";

      if (newPassword !== password)
        error.newPassword = "New Password and Confirm Password doesn't match !";
      if (!code) error.code = "purchase code is required !";
    } else {
      const loginData = {
        email,
        newPassword,
        password,
        code,
      };

      let response = await dispatch(signUp(loginData)).unwrap();
      console.log("response", response);
      response?.status
        ? navigate("/")
        : DangerRight(response?.message);
    }
  };

  return (
    <>
      <div className="mainLoginPage">
        <div className="loginDiv" style={{ width: "100%" }}>
          <div className="loginPage m-auto" style={{padding : "30px 35px"}}>
            <div className="loginTitle mb-3  d-flex ">
              <img src={logo} style={{ width: "50px" }} alt="logo" />
            </div>
            <div className="fw-bold text-theme  me-auto my-auto welComeTitle">
              Welcome Back
            </div>
            <h1>Sign Up !</h1>
            <h6 className="fw-bold text-theme  me-auto my-auto fs-15 py-2 title">
              Please,Enter Your Email id , Password and Purchase Code
            </h6>
            <div>
              <div className="col-12 ">
                <ExInput
                  type={`text`}
                  id={`email`}
                  name={`email`}
                  label={`Email`}
                  value={email}
                  placeholder={`Email`}
                  errorMessage={error.email && error.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        email: `email Id is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        email: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 ">
                <ExInput
                  type={`password`}
                  id={`password`}
                  name={`password`}
                  value={password}
                  label={`Password`}
                  placeholder={`Password`}
                  errorMessage={error.password && error.password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        password: `password is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        password: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 ">
                <ExInput
                  type={`password`}
                  id={`confirmPassword`}
                  name={`Confirm Password`}
                  value={newPassword}
                  label={`Confirm Password`}
                  placeholder={`Confirm Password`}
                  errorMessage={error.newPassword && error.newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        newPassword: `Confirm Password is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        newPassword: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 ">
                <ExInput
                  type={`text`}
                  id={`loginpurachseCode`}
                  name={`Purchase Code`}
                  value={code}
                  label={`Purchase Code`}
                  placeholder={`Purchase Code`}
                  errorMessage={error.code && error.code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        code: `Purchase Code is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        code: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="loginButton d-flex gx-2 justify-content-center m30-top">
                <Button
                  type={`submit`}
                  className={`bg-theme text-light cursor m10-top col-6 mx-2`}
                  text={`Sign Up`}
                  onClick={submit}
                  style={{ borderRadius: "30px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
