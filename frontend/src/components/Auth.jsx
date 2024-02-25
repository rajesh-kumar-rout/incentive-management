import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Auth() {
    const { account } = useAuth()

    console.log(account);

    return account ? <Outlet/> : <Navigate to={`/login?return=${window.location.href}`} replace />
}