import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Admin() {
    const { account } = useAuth()

    return account.isAdmin === 1 ? <Outlet/> : <Navigate to="/denied?message=Access denied. You are not an admin" replace/>
}