import { Route, Routes } from "react-router-dom"
import AuthContext from "../contexts/AuthContext.jsx"
import ChangePasswordPage from "../pages/ChangePasswordPage.jsx"
import CreateHolidayPage from "../pages/CreateHolidayPage.jsx"
import CreateSalePage from "../pages/CreateSalePage.jsx"
import EditAccountPage from "../pages/EditAccountPage.jsx"
import HolidayPage from "../pages/HolidayPage.jsx"
import HomePage from "../pages/HomePage.jsx"
import LoginPage from "../pages/LoginPage.jsx"
import PermissionPage from "../pages/PermissionPage.jsx"
import SalesPage from "../pages/SalesPage.jsx"
import Admin from "./Admin.jsx"
import Auth from "./Auth.jsx"
import Layout from "./Layout.jsx"
import DeniedPage from "../pages/DeniedPage.jsx"
import Active from "./Active.jsx"
import Guest from "./Guest.jsx"
import IncentivePage from "../pages/IncentivePage.jsx"

export default function App() {
    return (
        <AuthContext>
            <Routes>
                <Route path="/denied" element={<DeniedPage />} />

                <Route element={<Guest />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route element={<Auth />}>
                    <Route element={<Active />}>
                        <Route element={<Layout />}>
                            <Route element={<Admin />}>
                                <Route path="/permission" element={<PermissionPage />} />
                                <Route path="/holiday" element={<HolidayPage />} />
                                <Route path="/holiday/add" element={<CreateHolidayPage />} />
                                <Route path="/account/edit" element={<EditAccountPage />} />
                            </Route>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/sales" element={<SalesPage />} />
                            <Route path="/sales/add" element={<CreateSalePage />} />
                            <Route path="/incentives" element={<IncentivePage />} />
                            <Route path="/account/password/edit" element={<ChangePasswordPage />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </AuthContext>
    )
}