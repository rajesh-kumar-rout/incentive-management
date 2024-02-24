import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

export default function Admin() {
    const { account } = useAuth()

    return account.is_admin === 1 ? <Outlet/> : <Navigate to="/login" replace/>
}