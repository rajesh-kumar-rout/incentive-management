import { useEffect, useState } from "react"
import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"
import useFetcher from "../hooks/useFetcher"
import Loader from "../components/Loader"

export default function SalesPage() {
    const [sales, setSales] = useState([])
    const [loading, setLoading] = useState(true)
    const fetcher = useFetcher()

    const fetchPackages = async () => {
        const { data } = await fetcher({
            url: "/sales"
        })

        setSales(data.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchPackages()
    }, [])

    if (loading) {
        return <Loader size="full" variant="primary" />
    }

    return (
        <div>
            <div className="page-action">
                <h3 className="page-title">Sales</h3>

                <Link className="btn btn-sm btn-primary btn-action" to="/sales/add">
                    <MdAdd size={18} /> 
                    <span>Add New</span>
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>Customer Mobile</th>
                            <th>Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => (
                            <tr>
                                <td>{sale.id}</td>
                                <td>{sale.name}</td>
                                <td>{sale.mobile}</td>
                                <td>{sale.product}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}