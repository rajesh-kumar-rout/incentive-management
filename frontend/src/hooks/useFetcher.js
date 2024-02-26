import { useNavigate } from "react-router-dom"

export default function useFetcher() {
    const navigate = useNavigate()

    return async (config) => {
        config.url = import.meta.env.VITE_API_URL + config.url

        if (!config.headers) {
            config.headers = {}
        }

        if (!config.method) {
            config.method = "GET"
        }

        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        if (config.body && !(config.body instanceof FormData)) {
            config.headers["Content-Type"] = "application/json"
            config.body = JSON.stringify(config.body)
        }

        const response = await fetch(config.url, {
            method: config.method,
            headers: config.headers,
            body: config.body
        })

        let data = null

        if (response.headers.get("Content-Type").split(";")[0] === "application/json") {
            data = await response.json()
        } else {
            data = await response.text()
        }

        if (response.status === 401) {
            localStorage.removeItem("token")
            navigate("/login")
        } else if (response.status === 403) {
            navigate("/denied")
        }

        return {
            status: response.status,
            headers: response.headers,
            data
        }
    }
}