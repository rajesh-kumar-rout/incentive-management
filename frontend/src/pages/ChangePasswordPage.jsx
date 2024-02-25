import { ErrorMessage, Field, Form, Formik } from "formik"
import { toast } from "react-toastify"
import * as Yup from "yup"
import useFetcher from "../hooks/useFetcher"

const schema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string().required("New password is required").min(6, "New password must be at least 6 characters")
        .max(20, "New password must be within 20 characters"),
    confirmNewPassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref("newPassword")], "Password does not match")
})

export default function ChangePasswordPage() {
    const fetcher = useFetcher()

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        const { status, data } = await fetcher({
            url: "/account/password",
            method: "PATCH",
            body: values
        })

        if (status === 422) {
            toast.error(data.message)
        } else if (status === 200) {
            toast.success(data.message)
            resetForm()
        } else {
            toast.error("Sorry, An unknown error occur")
        }

        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
        >
            {({ isSubmitting }) => (
                <Form className="form" style={{ marginTop: 30 }}>
                    <h3 className="form-title">Change Password</h3>

                    <div className="form-group">
                        <label htmlFor="oldPassword" className="form-label required">Old Password</label>
                        <Field type="password" className="form-control" name="oldPassword" id="oldPassword" />
                        <ErrorMessage component="span" className="form-error" name="oldPassword" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword" className="form-label required">New Password</label>
                        <Field type="password" className="form-control" name="newPassword" id="newPassword" />
                        <ErrorMessage component="span" className="form-error" name="newPassword" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmNewPassword" className="form-label required">Confirm New Password</label>
                        <Field type="password" className="form-control" name="confirmNewPassword" id="confirmNewPassword" />
                        <ErrorMessage component="span" className="form-error" name="confirmNewPassword" />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-full">
                        {isSubmitting && <div className="loader loader-sm loader-white"></div>}
                        Change Password
                    </button>
                </Form>
            )}
        </Formik>
    )
}