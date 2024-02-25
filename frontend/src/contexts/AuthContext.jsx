import Loader from "../components/Loader"
import { createContext, useContext, useEffect, useState } from "react"
import useFetcher from "../hooks/useFetcher"

const Provider = createContext()

export const useAuth = () => useContext(Provider)

export default function AuthContext({ children }) {
    const [account, setAccount] = useState(null)
    const [loading, setLoading] = useState(true)
    const fetcher = useFetcher()

    const fetchAccount = async () => {
        const { data } = await fetcher({
            url: "/account"
        })

        setAccount(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchAccount()
    }, [])

    if (loading) {
        return <Loader size="full" variant="primary" />
    }

    return (
        <Provider.Provider
            value={{
                account,
                setAccount,
                loading,
                setLoading
            }}
        >
            {children}
        </Provider.Provider>
    )
}