import Layout from "./Layout.jsx";
import HomePage from "../pages/HomePage.jsx";
import { Route, Routes } from "react-router-dom";
import PermissionPage from "../pages/PermissionPage.jsx";
import HolidayPage from "../pages/HolidayPage.jsx";
import EditProfilePage from "../pages/EditAccountPage.jsx";
import ChangePasswordPage from "../pages/ChangePasswordPage.jsx";
import CreateHolidayPlanPage from "../pages/CreateHolidayPlanPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import AuthContext from "../context/AuthContext.jsx";
import Authenticate from "./Authenticate.jsx";
import Admin from "./Admin.jsx";
import EditPermissionPage from "../pages/EditPermissionPage.jsx";

export default function App() {

    return (
        <AuthContext>
            <Routes>
                <Route element={<Authenticate guest={true} />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                <Route element={<Authenticate />}>
                    <Route element={<Admin/>}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/permission" element={<PermissionPage />} />
                        <Route path="/holiday" element={<HolidayPage />} />
                        <Route path="/account/edit" element={<EditProfilePage />} />
                        <Route path="/account/password/edit" element={<ChangePasswordPage />} />
                        <Route path="/holiday/add" element={<CreateHolidayPlanPage />} />
                        <Route path="/permission/edit" element={<EditPermissionPage />} />
                    </Route>
                    </Route>
                </Route>
            </Routes>
        </AuthContext>
    )
}