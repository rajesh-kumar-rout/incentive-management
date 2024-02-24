import { createContext, useContext, useState, useEffect } from "react"
import useFetcher from "../hooks/fetcher"

const Provider = createContext()

export const useAuth = () => useContext(Provider)

export default function AuthContext({ children }) {
    const [account, setAccount] = useState(null)
    const [loading, setLoading] = useState(true)
    const fetcher = useFetcher()

    const loadAccount = async () => {
        const { status, data } = await fetcher({
            url: "/account"
        })

        if (status === 200) {
            setAccount(data)
        }

        setLoading(false)
    }

    useEffect(() => {
        loadAccount()
    }, [])

    if(loading){
        return (
            <div className="loader loader-primary"></div>
        )
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