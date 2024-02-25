import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import * as Yup from "yup"
import useFetcher from "../hooks/useFetcher"
import Loader from "../components/Loader"

const schema = Yup.object({
    productId: Yup.number().required("Product is required"),
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Mobile is required").min(10, "Enter 10 digit mobile number").max(10, "Enter 10 digit mobile number"),
})

export default function CreateSalePage() {
    const fetcher = useFetcher()
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const { data } = await fetcher({
            url: "/products"
        })

        setProducts(data)
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        const { status, data } = await fetcher({
            url: "/sales",
            method: "POST",
            body: values
        })

        if (status === 201) {
            toast.success(data.message)
            resetForm()
        } else {
            toast.error("Sorry, An unknown error occur")
        }

        setSubmitting(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Formik
            initialValues={{
                productId: "",
                name: "",
                mobile: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
        >
            {({ isSubmitting }) => (
                <Form className="form" style={{ marginTop: 30 }}>
                    <h3 className="form-title">Create Sale</h3>

                    <div className="form-group">
                        <label htmlFor="productId" className="form-label required">Product</label>
                        <Field as="select" className="form-control" name="productId" id="productId">
                            <option></option>
                            {products.map(product => <option value={product.id}>{product.name}</option>)}
                        </Field>
                        <ErrorMessage component="span" className="form-error" name="productId" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name" className="form-label required">Name</label>
                        <Field type="text" className="form-control" name="name" id="name" />
                        <ErrorMessage component="span" className="form-error" name="name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile" className="form-label required">Mobile</label>
                        <Field type="number" className="form-control" name="mobile" id="mobile" />
                        <ErrorMessage component="span" className="form-error" name="mobile" />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-full">
                        {isSubmitting && <Loader size="sm" variant="primary" />}
                        <span>Save</span>
                    </button>
                </Form>
            )}
        </Formik>
    )
}