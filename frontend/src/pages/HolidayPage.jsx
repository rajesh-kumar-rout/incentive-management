import { MdAdd, MdDelete, MdEdit, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useFetcher from "../hooks/fetcher";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function HolidayPage() {
    const [holidays, setHolidays] = useState([])
    const [loading, setLoading] = useState(true)
    const fetcher = useFetcher()

    const fetchPackages = async () => {
        const { data } = await fetcher({
            url: "/holidays"
        })

        setHolidays(data)
        setLoading(false)
    }

    const deletePackage = async (packageId) => {
        setLoading(true)

        const { status, data } = await fetcher({
            url: `/holidays/${packageId}`,
            method: "DELETE"
        })

        if (status === 200) {
            toast.success(data.message)
            setHolidays(holidays.filter(holiday => holiday.id !== packageId))
        } else {
            toast.error("Sorry, An unknown error occur")
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchPackages()
    }, [])

    if (loading) {
        return (
            <div className="loader loader-primary"></div>
        )
    }
    return (
        <div>

            <div className="page-action">
                <h3 className="page-title">Holiday Plans</h3>
                <Link className="btn btn-sm btn-primary btn-action" to="/holiday/add">
                    <MdAdd size={18} /> Add New</Link>
            </div>


            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Duration (Nights)</th>
                            <th>Destination</th>
                            <th>Location</th>
                            <th>Amenities</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holidays.map(holiday => (
                            <tr>
                                <td>{holiday.name}</td>
                                <td>{holiday.duration}</td>
                                <td>{holiday.destination}</td>
                                <td>{holiday.location}</td>
                                <td>{holiday.amenities.map(amenity => amenity.name).join(",")}</td>
                                <td>
                                    <Link className="icon-btn" title="Edit">
                                        <MdEdit size={18} />
                                    </Link>
                                    <button className="icon-btn" title="Delete" onClick={()=>deletePackage(holiday.id)}>
                                        <MdDelete size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}