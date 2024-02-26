import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import useFetcher from "../hooks/useFetcher"
import { MdClose } from "react-icons/md"

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
                            <th>Amount</th>
                            <th>Holiday Package</th>
                            <th>Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incentives.map(incentive => (
                            <tr key={incentive.id}>
                                <td>{incentive.id}</td>
                                <td>{incentive.percentage}</td>
                                <td>{incentive.bonus ?? "NA"}</td>
                                <td>{incentive.amount}</td>
                                <td>{incentive.holidayPackage ?? <MdClose fill="var(--color-red-600)"/>}</td>
                                <td>{incentive.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}