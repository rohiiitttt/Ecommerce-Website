import { useState } from "react";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import FormikInputComponent from "./FormikInputComponent";
import axios from "axios";
import WithUser from "./WithUser";
import WithAlert from "./WithAlert";

function LoginPage({ user, setUser, setAlert }) {
  const [showPassword, setShowPassword] = useState(false);

  if(user){
    setAlert(undefined);
  }

  function callLoginAPI(values, setAlert, bag) {
    axios.post("https://myeasykart.codeyogi.io/login", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        setUser(user);
        setAlert({ type: "success", message: "Login successful!" });
      })
      .catch((error) => {
        if (error.response) {
          setAlert({ type: "error", message: "Invalid credentials or server issue." });
          setTimeout(() => setAlert(null), 3000);
        } else if (error.request) {
          setAlert({ type: "error", message: "Network error or server not responding." });
          setTimeout(() => setAlert(null), 3000);
        } else {
          setAlert({ type: "error", message: "Unexpected error occurred." });
          setTimeout(() => setAlert(null), 3000);
        }
      });
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters long")
      .required("Password is required"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 bg-red-300 rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-2xl font-bold">Login to MyCart</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
          onSubmit={(values, bag) => callLoginAPI(values, setAlert, bag)} // Pass setAlert directly here
          validateOnBlur
          validateOnChange
        >
          {({ handleSubmit, values, handleChange, handleBlur, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <FormikInputComponent
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email}
              />

              <div className="relative mb-4">
                <FormikInputComponent
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && errors.password}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 mr-3 text-sm"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Login
              </button>

              <p className="mt-4 text-center">
                Do not have an Account? <Link className="text-blue-600 hover:underline" to="/signup">SignUp</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default WithUser(WithAlert(LoginPage));