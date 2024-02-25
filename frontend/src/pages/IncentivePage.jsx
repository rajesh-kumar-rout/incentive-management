import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import useFetcher from "../hooks/useFetcher"

export default function IncentivePage() {
    const [incentives, setIncentives] = useState([])
    const [loading, setLoading] = useState(true)
    const fetcher = useFetcher()

    const fetchIncentives = async () => {
        const { data } = await fetcher({
            url: "/incentives"
        })

        console.log(data);

        setIncentives(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchIncentives()
    }, [])

    if (loading) {
        return <Loader size="full" variant="primary" />
    }

    return (
        <div>
            <div className="page-action">
                <h3 className="page-title">Incentives</h3>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Percentage</th>
                            <th>Bonus</th>
                            <th>Holiday Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incentives.map(incentive => (
                            <tr key={id}>
                                <td>{incentive.id}</td>
                                <td>{incentive.percentage}</td>
                                <td>{incentive.bonus}</td>
                                <td>{incentive.holidayPackage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}