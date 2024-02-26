import { useEffect, useState } from "react"
import { MdAdd, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import useFetcher from "../hooks/useFetcher"

export default function SalesPage() {
    const [sales, setSales] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const fetcher = useFetcher()

    const fetchPackages = async () => {
        const { data } = await fetcher({
            url: `/sales?page=${currentPage}`
        })

        setSales(data.data)
        setTotalPage(data.totalPage)
        setLoading(false)
    }

    const pages = () => {
        const pages = []

        for (let index = 1; index <= totalPage; index++) {
            pages.push(index)
        }

        return pages
    }

    useEffect(() => {
        fetchPackages()
    }, [currentPage])

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

            <div className="pagination-container">
                <div className="pagination">
                    {currentPage !== 1 && (
                        <button className="pagination-item" onClick={() => setCurrentPage(currentPage - 1)}>
                            <MdArrowBackIos size={16} />
                        </button>
                    )}

                    <select value={currentPage} className="pagination-item" onChange={event => setCurrentPage(parseInt(event.target.value))}>
                        {pages().map(page => <option value={page}>{page}</option>)}
                    </select>

                    {currentPage < totalPage && (
                        <button className="pagination-item" onClick={() => setCurrentPage(currentPage + 1)}>
                            <MdArrowForwardIos size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}