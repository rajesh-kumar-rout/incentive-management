import { MdAccountCircle, MdHome, MdList, MdLogout, MdPassword, MdSettings } from "react-icons/md"
import { Link, NavLink, Outlet } from "react-router-dom"
import { toast } from "react-toastify"
import useFetcher from "../hooks/useFetcher"
import { useAuth } from "../contexts/AuthContext"

export default function Layout() {
    const fetcher = useFetcher()
    const { account } = useAuth()

    const handleLogout = async event => {
        event.preventDefault()

        if (!confirm("Are you sure you want to logout ?")) return

        const { data } = await fetcher({
            url: "/account/logout",
            method: "DELETE"
        })

        toast.success(data.message)
        localStorage.removeItem("token")
        window.location.href = "/login"
    }

    return (
        <div>
            <div className="sidebar">
                <h3 className="sidebar-title">Incentive Management</h3>

                <ul className="sidebar-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdHome size={24} className="sidebar-icon" />
                            <span className="sidebar-label">Home</span>
                        </NavLink>
                    </li>

                    {account.isAdmin === 1 ? (
                        <>
                            <li>
                                <NavLink to="/holiday" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                                    <MdList size={24} className="sidebar-icon" />
                                    <span className="sidebar-label">Holiday Plans</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/permission" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                                    <MdSettings size={24} className="sidebar-icon" />
                                    <span className="sidebar-label">Permissions</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/account/edit" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                                    <MdAccountCircle size={24} className="sidebar-icon" />
                                    <span className="sidebar-label">Edit Profile</span>
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/sales" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                                    <MdSettings size={24} className="sidebar-icon" />
                                    <span className="sidebar-label">Sales</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/incentives" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                                    <MdAccountCircle size={24} className="sidebar-icon" />
                                    <span className="sidebar-label">Incentives</span>
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li>
                        <NavLink to="/account/password/edit" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdPassword size={24} className="sidebar-icon" />
                            <span className="sidebar-label">Change Password</span>
                        </NavLink>
                    </li>

                    <li>
                        <Link onClick={handleLogout} className="sidebar-link">
                            <MdLogout size={24} className="sidebar-icon" />
                            <span className="sidebar-label">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}