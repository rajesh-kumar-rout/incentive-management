export default function useFetcher() {
    return async(config) => {
        config.url = "http://localhost:3001/admin" + config.url

        if(config.headers === undefined) {
            config.headers = {}
        }

        if(config.method === undefined){
            config.method = "GET"
        }

        const token = localStorage.getItem("token")

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        if (config.body) {
            if (config.body instanceof FormData === false) {
                config.headers["Content-Type"] = "application/json"
                config.body = JSON.stringify(config.body)
            }
        }

        const response = await fetch(config.url, {
            method: config.method,
            headers: config.headers,
            body: config.body
        })

        let data = null

        if(response.headers.get("Content-Type").split(";")[0] === "application/json") {
            data = await response.json()
        } else {
            data = await response.text()
        }

        return {
            status: response.status,
            headers: response.headers,
            data
        }
    }
}