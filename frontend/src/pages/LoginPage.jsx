import { Field, Formik, Form, ErrorMessage } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import axios from "../utils/axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import useFetcher from "../hooks/fetcher"

const schema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required")
})

export default function LoginPage() {
    const searchParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const fetcher = useFetcher()

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)

        const { status, data } = await fetcher({
            url: "/account/login",
            method: "post",
            body: values
        })

        console.log(status, data);

        if (status === 422) {
            toast.error(data.message)
        } else if (status === 200) {
            localStorage.setItem("token", data.token)
            window.location.href = searchParams.get("return") ?? "/"
        } else {
            toast.error("Sorry, An unknown error occured")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting, }) => (
                <Form className="form" style={{ marginTop: 30 }}>
                    <h3 className="form-title">Login</h3>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label required">Email</label>
                        <Field type="email" className="form-control" name="email" id="email" />
                        <ErrorMessage component="span" name="email" className="form-error" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label required">Password</label>
                        <Field type="password" className="form-control" name="password" id="password" />
                        <ErrorMessage component="span" name="password" className="form-error" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-full">Login</button>
                </Form>
            )}
        </Formik>

    )
}