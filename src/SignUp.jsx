import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function SignUp() {
    const handleSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            dob: "",
            address: "",
            mobilenumber: "",
            createpassword: "",
        },
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            dob: Yup.date().required("Date of Birth is required"),
            address: Yup.string().required("Address is required"),
            mobilenumber: Yup.number()
                .typeError("That doesn't look like a phone number")
                .positive("A phone number can't start with a minus")
                .integer("A phone number can't include a decimal point")
                .min(10, 'Must be exactly 10 digits')
                .max(10, 'Must be exactly 10 digits')
                .required('A phone number is required'),
            createpassword: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        }),
    });

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (event.target.id === "name") {
                document.getElementById("email").focus();
                event.preventDefault();
            } else if (event.target.id === "email") {
                document.getElementById("dob").focus();
                event.preventDefault();
            } else if (event.target.id === "dob") {
                document.getElementById("address").focus();
                event.preventDefault();
            } else if (event.target.id === "address") {
                document.getElementById("mobilenumber").focus();
                event.preventDefault();
            } else if (event.target.id === "mobilenumber") {
                document.getElementById("createpassword").focus();
                event.preventDefault();
            } else if (event.target.id === "createpassword") {
                formik.handleSubmit();
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-red-300 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="border border-gray-300 rounded-md w-full p-2"
                            placeholder="Enter your name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 rounded-md w-full p-2"
                            placeholder="Enter your email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            className="border border-gray-300 rounded-md w-full p-2"
                            name="dob"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                        {formik.touched.dob && formik.errors.dob && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.dob}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="border border-gray-300 rounded-md w-full p-2"
                            placeholder="Enter your address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                        {formik.touched.address && formik.errors.address && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobilenumber" className="block text-gray-700 font-bold mb-2">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobilenumber"
                            className="border border-gray-300 rounded-md w-full p-2"
                            placeholder="Enter your mobile number"
                            name="mobilenumber"
                            value={formik.values.mobilenumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                        {formik.touched.mobilenumber && formik.errors.mobilenumber && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.mobilenumber}</div>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="createpassword" className="block text-gray-700 font-bold mb-2">Create Password</label>
                        <input
                            type="password"
                            id="createpassword"
                            className="border border-gray-300 rounded-md w-full p-2"
                            placeholder="Create a password"
                            name="createpassword"
                            value={formik.values.createpassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                        {formik.touched.createpassword && formik.errors.createpassword && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.createpassword}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={!formik.isValid || formik.isSubmitting}
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
  Already have an account? <Link className="text-blue-600 hover:underline" to="/login">Login</Link>
</p>

            </div>
        </div>
    );
}

export default SignUp;
