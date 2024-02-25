import { useEffect, useState } from "react"
import { MdAdd, MdDelete, MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import useFetcher from "../hooks/useFetcher"
import Loader from "../components/Loader"

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
        if (!confirm("Are you sure you want to delete ? This is can not be undo")) return

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
        return <Loader size="full" variant="primary" />
    }

    return (
        <div>
            <div className="page-action">
                <h3 className="page-title">Holiday Plans</h3>

                <Link className="btn btn-sm btn-primary btn-action" to="/holiday/add">
                    <MdAdd size={18} />
                    <span>Add New</span>
                </Link>
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
                                <td>{holiday.amenities.join(",")}</td>
                                <td>
                                    <Link to={`/holiday/add?id=${holiday.id}`} className="icon-btn" title="Edit">
                                        <MdEdit size={18} />
                                    </Link>
                                    
                                    <button className="icon-btn" title="Delete" onClick={() => deletePackage(holiday.id)}>
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