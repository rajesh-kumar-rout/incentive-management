import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001/admin"

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")

    config.headers.Authorization = `Bearer ${token}`

    return config
})

axios.interceptors.response.use(response => response, error => {
    if(error.response.status === 401) {
        window.location.href = "/login"
    }
    return Promise.reject(error)
})

export default axios