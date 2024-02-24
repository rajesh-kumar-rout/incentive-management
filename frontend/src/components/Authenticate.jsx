import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

export default function Authenticate({ guest }) {
    const { account } = useAuth()

    if (guest && account) {
        return <Navigate to="/" replace />
    }

    if (!guest && !account) {
        return <Navigate to={`/login?return=${window.location.href}`} replace />
    }

    return <Outlet/>
}