import { useState } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { Link } from "react-router-dom";

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

  const { handleSubmit, values, handleChange, errors, handleBlur, touched} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: callLoginAPI,
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
  });
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target.id === "email") {
        document.getElementById("password").focus();
        event.preventDefault();
      } else if (event.target.id === "password") {
        handleSubmit(event);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-red-300 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login to MyCart</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2 sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-md w-full p-2"
              value={values.email}
              name="email"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              placeholder="email"
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <div className="flex items-center text-red-500 text-sm mt-1">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                {errors.email}
              </div>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2 sr-only">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="border border-gray-300 rounded-md w-full p-2"
              value={values.password}
              name="password"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              placeholder="password"
              onBlur={handleBlur}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 mr-3 text-sm"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            {touched.password && errors.password && (
              <div className="flex items-center text-red-500 text-sm mt-1 mb-2">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                {errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <p className="text-center mt-4">
  Do not have an Account? <Link className="text-blue-600 hover:underline" to="/signup">SignUp</Link>
</p>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;
