import React, { useRef, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import UserContext from "./UserContext";
=======
import AuthContext from "./context/AuthProvider";
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "./axios";

export const LoginPage = (props) => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assume login API returns user info and token
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      console.log(response);
      const userData = response.data;

      login(userData); // Update the context with user data
      setSuccess(true);
      setEmail("");
      setPassword("");
      navigate("/dashboard", { state: { email: email } });
    } catch (err) {
      setErrMsg("Login Failed");
    }
  };

  const toggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggle = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <>
      {success ? (
        navigate("/dashboard", { state: { email: email } })
      ) : (
<<<<<<< HEAD
        <div className="container forms">
          <div className="mx-auto mt-36 text-center">
            <h1 className="text-blue mt-20 font-semibold text-5xl font-outfit">
              Uncluttered
            </h1>
          </div>
          <div className="flex justify-center">
            <section className="login-form rounded-lg drop-shadow-md h-auto w-auto m-16 p-10 bg-white">
              <form>
                <h2 className="font-inter font-semibold text-center m-5 bg-white text-blue text-xl">
                  Login To Your Account
                </h2>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  required
                  name="email"
                  className="rounded-t-md border mt-5 p-2 w-full max-w-md"
                />
                <div className="w-full relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    required
                    name="password"
                    className="rounded-b-md border p-2 mb-5 w-full max-w-md"
                  />
                  <div className="text-2xl absolute top-2 right-2">
                    {passwordVisible ? (
                      <IoEyeOffOutline onClick={toggle} />
                    ) : (
                      <IoEyeOutline onClick={toggle} />
                    )}
                  </div>
                </div>
                {/* <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
=======
      <div className="container forms">
        <div className="mx-auto mt-36 text-center">
          <h1 className="text-blue mt-20 font-semibold text-5xl font-outfit">
            Uncluttered
          </h1>
        </div>
        <div className="flex justify-center">
          <section className="login-form rounded-lg drop-shadow-md h-auto w-auto m-16 p-10 bg-white">
            <form>
              <h2 className="font-inter font-semibold text-center m-5 bg-white text-blue text-xl">
                Login To Your Account
              </h2>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                id="email"
                ref={userRef}
                autoComplete="off"
                required
                name="email"
                className="rounded-t-md border mt-5 p-2 w-full max-w-md"
              />
              <div className="w-full relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordVisible ? "text" : "password"}
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
                  placeholder="Password"
                  id="password"
                  required
                  name="password"
                  className="rounded-b-md border p-2 mb-5 w-full max-w-md"
<<<<<<< HEAD
                /> */}
                {/*<p className="justify-right text-blue mb-5">Forgot your password?</p>*/}
                {/* <Link to="/dashboard"> */}
=======
                />
                <div className="text-2xl absolute top-2 right-2">
                  { passwordVisible ? <IoEyeOffOutline onClick={toggle}/> : <IoEyeOutline onClick={toggle}/>}
                </div>
              </div>
              {/*<p className="justify-right text-blue mb-5">Forgot your password?</p>*/}
              {/* <Link to="/dashboard"> */}
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
                <button
                  className="button w-full max-w-md bg-blue hover:bg-blue-dark mb-2 px-6 py-2 text-white rounded-md font-inter font-regular"
                  disabled={email === "" || password === "" ? true : false}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                {/* </Link> */}
              </form>
              <Link to="/register">
                <button className="button w-full max-w-md bg-blue hover:bg-blue-dark mb-24 px-6 py-2 text-white rounded-md font-inter font-regular">
                  Register a new account
                </button>
              </Link>
            </section>
          </div>
        </div>
      )}
    </>
  );

  function submitForm() {
    handleSubmit(email, password);
    setEmail("");
    setPassword("");
  }
};
