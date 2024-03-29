import Loader from "../components/Loader"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { toast } from "react-toastify"
import * as Yup from "yup"
import useFetcher from "../hooks/useFetcher"

const schema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required")
})

export default function LoginPage() {
    const searchParams = new URLSearchParams(window.location.search)
    const fetcher = useFetcher()

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)

        const { status, data } = await fetcher({
            url: "/account/login",
            method: "post",
            body: values
        })

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
            {({ isSubmitting, }) => (
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

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-full">
                        {isSubmitting && <Loader size="sm" variant="white" />}
                        <span>Login</span>
                    </button>
                </Form>
            )}
        </Formik>
    )
}