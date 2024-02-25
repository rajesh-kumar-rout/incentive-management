import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Active() {
    const { account } = useAuth()

    return account.isActive === 1 ? <Outlet/> : <Navigate to="/denied?message=You are blocked by admin" replace/>
}