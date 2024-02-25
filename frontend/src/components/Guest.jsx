import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Guest() {
    const { account } = useAuth()

    return account ?  <Navigate to="/" replace /> : <Outlet/>
}