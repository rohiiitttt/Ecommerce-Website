  import { useState } from "react";
  import { Formik } from "formik";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faEye, faEyeSlash, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
  import * as Yup from "yup";
  import { Link, Navigate } from "react-router-dom";
  import FormikInputComponent from "./FormikInputComponent";
  import axios from "axios";

  function LoginPage({ user, setUser }) {
    const [showPassword, setShowPassword] = useState(false);

    function callLoginAPI(values, bag) {
      axios.post("https://myeasykart.codeyogi.io/login", {
        email: values.email,
        password: values.password,
      })
        .then((response) => {
          const { user, token } = response.data; 
          localStorage.setItem("token",token);
          setUser(user);
        })
        .catch((error) => {
          if (error.response) {
            // Server responded with a status other than 200 range
            bag.setErrors({ email: "Invalid credentials or server issue." });
          } else if (error.request) {
            // Request was made but no response was received
            bag.setErrors({ email: "Network error or server not responding." });
          } else {
            // Something else happened in setting up the request
            bag.setErrors({ email: "Unexpected error occurred." });
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
            onSubmit={callLoginAPI}
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

  export default LoginPage;
