import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik"
import { MdAdd, MdClose } from "react-icons/md"
import useFetcher from "../hooks/fetcher"
import * as Yup from "yup"
import { toast } from "react-toastify"

const schema = Yup.object({
    name: Yup.string().required("Name is required"),
    duration: Yup.number().required("Duration is required"),
    destination: Yup.string().required("Destination is required"),
    location: Yup.string().required("Location is required"),
    amenities: Yup.array().required().of(Yup.string().required("Amenity is required"))
})


export default function CreateHolidayPlanPage() {
    const fetcher = useFetcher()

    const handleSubmit = async (values, { resetForm }) => {
        const { status, data } = await fetcher({
            url: "/holidays",
            method: "POST",
            body: values
        })

        if(status === 201) {
            toast.success(data.message)
            resetForm()
        } else if(status === 409) {
            toast.success(data.message)
        } else {
            toast.error("Sorry, An unknown error occur")
        }
    }

    return (
        <Formik
            initialValues={{
                name: "",
                duration: "",
                location: "",
                destination: "",
                amenities: [""]
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting }) => (
                <Form className="form" style={{ marginTop: 30 }}>
                    <h3 className="form-title">Add Holiday Plan</h3>

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
                        {isSubmitting && <div className="loader loader-sm loader-white"></div>}
                        <span>Save</span>
                    </button>
                </Form>
            )}
        </Formik>
    )
}