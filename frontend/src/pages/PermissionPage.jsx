import { useEffect, useState } from "react"
import useFetcher from "../hooks/fetcher"
import { Link } from "react-router-dom"
import { MdAdd, MdCheck, MdClose, MdDone, MdEdit } from "react-icons/md"

export default function PermissionPage() {
    const fetcher = useFetcher()
    const [loading, setLoading] = useState(true)
    const [permissions, setPermissions] = useState(null)

    const fetchPermissions = async () => {
        const { data } = await fetcher({
            url: "/permissions"
        })

        setPermissions(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchPermissions()
    }, [])

    if(loading){
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
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.map(permission => (
                        <tr>
                            <td>{permission.name}</td>
                            <td>{permission.email}</td>
                            <td>
                                {permission.is_admin ? <MdDone fill="var(--color-green-600)"/> : <MdClose fill="var(--color-red-600)"/>}
                            </td>
                            <td>{permission.is_active ? <MdDone fill="var(--color-green-600)"/> : <MdClose fill="var(--color-red-600)"/>}</td>
                            <td>
                                <Link to={`/holiday/add?id=${permission.id}`} className="icon-btn" title="Edit">
                                    <MdEdit size={18} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}