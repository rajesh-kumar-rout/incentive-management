import { NavLink, Outlet } from "react-router-dom"
import { MdAccessibility, MdAccountCircle, MdHome, MdList, MdLogout, MdPassword, MdSettings } from "react-icons/md"

export default function Layout(){

    const handleLogout = e => {
        e.preventDefault()

        if(confirm("Are you sure you want to logout ?")){
            
        }
    }

    return (
        <div>
            <div className="sidebar">
                <h3 className="sidebar-title">Incentive Management</h3>

                <ul className="sidebar-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdHome size={24} className="sidebar-icon"/>
                            <span className="sidebar-label">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/holiday" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdList size={24} className="sidebar-icon"/>
                            <span className="sidebar-label">Holiday Plans</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/permission" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdSettings size={24} className="sidebar-icon"/>
                            <span className="sidebar-label">Permissions</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account/password/edit" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdPassword size={24} className="sidebar-icon"/>
                            <span className="sidebar-label">Change Password</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account/edit" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : null}`}>
                            <MdAccountCircle size={24} className="sidebar-icon"/>
                            <span className="sidebar-label">Edit Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={handleLogout} className="sidebar-link">
                            <MdLogout size={24} className="sidebar-icon"/>
                            <span className="sidebar-label">Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}