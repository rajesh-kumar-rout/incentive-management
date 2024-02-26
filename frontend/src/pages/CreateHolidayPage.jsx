import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"
import { toast } from "react-toastify"
import * as Yup from "yup"
import useFetcher from "../hooks/useFetcher"
import Loader from "../components/Loader"

const schema = Yup.object({
    name: Yup.string().required("Name is required"),
    duration: Yup.number().required("Duration is required"),
    destination: Yup.string().required("Destination is required"),
    location: Yup.string().required("Location is required"),
    amenities: Yup.array().required().of(Yup.string().required("Amenity is required"))
})

export default function CreateHolidayPage() {
    const fetcher = useFetcher()
    const id = new URLSearchParams(window.location.search).get("id")
    const [loading, setLoading] = useState(false)
    const [holiday, setHoliday] = useState({
        name: "",
        destination: "",
        location: "",
        amenities: [""],
        duration: ""
    })

    const fetchHolidays = async () => {
        const { data } = await fetcher({
            url: `/holidays/${id}`
        })

        setHoliday(data)
        setLoading(false)
    }

    const handleSubmit = async (values, { resetForm }) => {
        const url = id ? `/holidays/${id}` : "/holidays"

        const method = id ? "PATCH" : "POST"

        const { status, data } = await fetcher({
            url,
            method,
            body: values
        })

        console.log(data);

        if (status === 201) {
            toast.success(data.message)
            resetForm()
        } else if(status === 200){
            toast.success(data.message)
        } else if (status === 409) {
            toast.success(data.message)
        } else {
            toast.error("Sorry, An unknown error occur")
        }
    }

    useEffect(() => {
        if (id) {
            setLoading(true)
            fetchHolidays()
        }
    }, [])

    if (loading) {
        return <Loader size="full" variant="primary" />
    }

    return (
        <Formik
            initialValues={holiday}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting }) => (
                <Form className="form" style={{ marginTop: 30 }}>
                    <h3 className="form-title">{id ? "Edit Holiday Package" : "Add Holiday Package"}</h3>

                    <div className="form-group">
                        <label htmlFor="name" className="form-label required">Name</label>
                        <Field type="text" className="form-control" name="name" id="name" />
                        <ErrorMessage component="span" name="name" className="form-error" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration" className="form-label required">Duration (Night)</label>
                        <Field type="number" className="form-control" name="duration" id="duration" />
                        <ErrorMessage component="span" name="duration" className="form-error" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="destination" className="form-label required">Destination</label>
                        <Field type="text" className="form-control" name="destination" id="destination" />
                        <ErrorMessage component="span" name="destination" className="form-error" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location" className="form-label required">Location</label>
                        <Field type="text" className="form-control" name="location" id="location" />
                        <ErrorMessage component="span" name="location" className="form-error" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amenities" className="form-label">Amenities</label>
                        <FieldArray
                            name="amenities"
                            render={helpers => (
                                <div className="amenities">
                                    {values.amenities.map((_, index) => (
                                        <div>
                                            <div className="amenity">
                                                <Field type="text" className="form-control" name={`amenities.${index}`} />
                                                {index === 0 ? (
                                                    <MdAdd
                                                        onClick={() => helpers.push("")}
                                                        size={18}
                                                        title="Add"
                                                    />
                                                ) : (
                                                    <MdClose
                                                        onClick={() => helpers.remove(index)}
                                                        size={18}
                                                        title="Remove"
                                                    />
                                                )}
                                            </div>
                                            <ErrorMessage component="span" name={`amenities.${index}`} className="form-error" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-full">
                        {isSubmitting && <Loader size="sm" variant="white" />}
                        <span>Save</span>
                    </button>
                </Form>
            )}
        </Formik>
    )
}