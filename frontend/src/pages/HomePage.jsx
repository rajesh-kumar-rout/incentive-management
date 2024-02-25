import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import useFetcher from "../hooks/useFetcher"

export default function HomePage() {
    const [loading, setLoading] = useState(true)
    const [statisticsList, setStatisticsList] = useState(null)
    const fetcher = useFetcher()

    const fetchStatistics = async () => {
        const { data } = await fetcher({
            url: "/statistics"
        })

        setStatisticsList(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchStatistics()
    }, [])

    if (loading) {
        return <Loader size="full" variant="primary" />
    }

    return (
        <div className="statistics-list">
            {statisticsList.map(statistics => (
                <div className="statistics">
                    <p className="statistics-label">{statistics.label}</p>
                    <h2 className="statistics-number">{statistics.count}</h2>
                </div>
            ))}
        </div>
    )
}