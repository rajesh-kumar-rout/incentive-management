import { useEffect, useState } from "react"
import { MdClose, MdDone } from "react-icons/md"
import { toast } from "react-toastify"
import useFetcher from "../hooks/useFetcher"
import Loader from "../components/Loader"

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

    const changePermission = async (id, action) => {
        if (!confirm("Are you sure you want to do this action ?")) return

        setLoading(true)

        const { data } = await fetcher({
            url: `/permissions/${id}?action=${action}`,
            method: "PATCH"
        })

        toast.success(data.message)
        fetchPermissions()
    }

    useEffect(() => {
        fetchPermissions()
    }, [])

    if (loading) {
        return <Loader size="full" variant="primary" />
    }

    return (
        <div>
            <div className="page-action">
                <h3 className="page-title">Permissions</h3>
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
                            <tr key={permission.id}>
                                <td>{permission.name}</td>
                                <td>{permission.email}</td>
                                <td>
                                    {permission.isAdmin ? <MdDone fill="var(--color-green-600)" /> : <MdClose fill="var(--color-red-600)" />}
                                </td>
                                <td>
                                    {permission.isActive ? <MdDone fill="var(--color-green-600)" /> : <MdClose fill="var(--color-red-600)" />}
                                </td>
                                <td>
                                    <div style={{ display: "flex", gap: 4 }}>
                                        {permission.isAdmin ? (
                                            <button className="btn btn-sm btn-danger" onClick={() => changePermission(permission.id, "removeAdmin")}>
                                                Remove Admin
                                            </button>
                                        ) : (
                                            <button className="btn btn-sm btn-success" onClick={() => changePermission(permission.id, "makeAdmin")}>
                                                Make Admin
                                            </button>
                                        )}

                                        {permission.isActive ? (
                                            <button className="btn btn-sm btn-danger" onClick={() => changePermission(permission.id, "deactivate")}>
                                                Deactivate
                                            </button>
                                        ) : (
                                            <button className="btn btn-sm btn-success" onClick={() => changePermission(permission.id, "activate")}>
                                                Activate
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}