import React, { useContext, useState } from "react";
import { Button, TextInput, Alert } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResetCode from './../ResetCode/ResetCode';

export default function ForgetPass() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const Navigate = useNavigate()

    let myValid = yup.object().shape({
        email: yup.string().email("Not valid").required("Email is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: myValid,
        onSubmit: getPassword,
    });

    async function getPassword(values) {
        setLoading(true);
        setMessage("");
        setError("");

        try {
            let { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                { email: values.email }
            );

            if (data.statusMsg === "success") {
                setMessage(data.message);
                Navigate("/ResetCode")
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
        catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }

        
    }


    

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="px-8 w-full flex flex-col items-center justify-center">
                <div className="mb-2 w-full md:w-1/3">
                    <label htmlFor="email">Enter Your Email</label>
                </div>
                <div className="md:w-1/3 w-full">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.errors.email && formik.touched.email && (
                    <Alert className="md:w-1/3 w-full my-2" color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Info alert!</span> {formik.errors.email}
                    </Alert>
                )}

                {message && (
                    <Alert className="md:w-1/3 w-full my-2" color="success">
                        {message}
                    </Alert>
                )}
                {error && (
                    <Alert className="md:w-1/3 w-full my-2" color="failure">
                        {error}
                    </Alert>
                )}

                <div className="flex flex-col mt-8 w-full justify-center items-center">
                    <Button className="btn" type="submit" disabled={loading}>
                        {loading ? <span className="loader"></span> : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    );
}
