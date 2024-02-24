import { Link, NavLink, Outlet } from "react-router-dom"
import { MdAccessibility, MdAccountCircle, MdHome, MdList, MdLogout, MdPassword, MdSettings } from "react-icons/md"
import useFetcher from "../hooks/fetcher"
import { toast } from "react-toastify"

export default function Layout() {
    const fetcher = useFetcher()

    const handleLogout = async event => {
        event.preventDefault()

        if (confirm("Are you sure you want to logout ?")) {
            const { status, data } = await fetcher({
                url: "/account/logout",
                method: "DELETE"
            })

            if (status === 200) {
                toast.success(data.message)
                localStorage.removeItem("token")
                window.location.href = "/login"
            } else {
                toast.error("Sorry, An unknown error occured")
            }
        }
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
                        <NavLink to="/account/password/edit" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdPassword size={24} className="sidebar-icon" />
                            <span className="sidebar-label">Change Password</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account/edit" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdAccountCircle size={24} className="sidebar-icon" />
                            <span className="sidebar-label">Edit Profile</span>
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
                <div className="loader loader-sm loader-primary"></div>
                <Outlet />
            </div>
        </div>
    )
}