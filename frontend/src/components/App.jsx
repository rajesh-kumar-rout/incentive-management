import Layout from "./Layout.jsx";
import HomePage from "../pages/HomePage.jsx";
import { Route, Routes } from "react-router-dom";
import PermissionPage from "../pages/PermissionPage.jsx";
import HolidayPage from "../pages/HolidayPage.jsx";
import EditProfilePage from "../pages/EditProfilePage.jsx";
import ChangePasswordPage from "../pages/ChangePasswordPage.jsx";
import CreateHolidayPlanPage from "../pages/CreateHolidayPlanPage.jsx";

export default function App(){
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/permission" element={<PermissionPage/>}/>
                <Route path="/holiday" element={<HolidayPage/>}/>
                <Route path="/account/edit" element={<EditProfilePage/>}/>
                <Route path="/account/password/edit" element={<ChangePasswordPage/>}/>
                <Route path="/holiday/add" element={<CreateHolidayPlanPage/>}/>
            </Route>
        </Routes>
    )
}