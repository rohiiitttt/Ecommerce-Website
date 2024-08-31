// LoginPage.jsx
import { useState } from "react";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import FormikInputComponent from "./FormikInputComponent";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const callLoginAPI = (values) => {
    console.log("API called with email:", values.email, "and password:", values.password);
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters long")
      .required("Password is required"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              />

              <div className="relative mb-4">
                <FormikInputComponent
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 mr-3 text-sm"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                {touched.password && errors.password && (
                  <div className="flex items-center mt-1 mb-2 text-sm text-red-500">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                    {errors.password}
                  </div>
                )}
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
