import { ErrorMessage, Field, Formik, Form } from "formik"
import useFetcher from "../hooks/fetcher"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"

const schema = Yup.object({
    name: Yup.string().required("Name is required")
})

export default function EditAccountPage() {
    const fetcher = useFetcher()
    const { account } = useAuth()

    const handleSubmit = async (values, { setSubmitting}) => {
        setSubmitting(true)

        const { status, data } = await fetcher({
            url: "/account",
            method: "PATCH",
            body: values
        })

        if (status === 422) {
            toast.error(data.message)
        } else if (status === 200) {
            toast.success(data.message)

        } else {
            toast.error("Sorry, An unknown error occur")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                name: account.name,
                email: account.email
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
        >
            {({ isSubmitting }) => (
                <Form className="form" style={{ marginTop: 30 }}>
                    <h3 className="form-title">Edit Account</h3>

                    <div className="form-group">
                        <label htmlFor="name" className="form-label required">Name</label>
                        <Field type="text" className="form-control" name="name" id="name" />
                        <ErrorMessage component="span" className="form-error" name="name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label required">Email</label>
                        <Field type="email" disabled className="form-control" name="email" id="email" />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-full">
                        {isSubmitting && <div className="loader loader-sm loader-white"></div>}
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    )
}