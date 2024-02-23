import { MdAdd, MdDelete, MdEdit, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function HolidayPage() {
    return (
        <div>

            <div className="page-action">
                <h3 className="page-title">Holiday Plans</h3>
                <Link className="btn btn-sm btn-primary btn-action" to="/holiday/add">
                   <MdAdd size={18}/> Add New</Link>
            </div>


            <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Duration (Nights)</th>
                                <th>Destination</th>
                                <th>Location</th>
                                <th>Amenities</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Maldives Plan</td>
                                <td>2</td>
                                <td>Maldives</td>
                                <td>East</td>
                                <td>Free Return Ticket</td>
                                <td>
                                    <Link className="icon-btn" title="Edit">
                                        <MdEdit size={18} />
                                    </Link>
                                    <button className="icon-btn" title="Delete">
                                        <MdDelete size={18} />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Lakshadweep Plan</td>
                                <td>4</td>
                                <td>Lakshadweep</td>
                                <td>West</td>
                                <td>Free Food</td>
                                <td>
                                    <Link className="icon-btn" title="Edit">
                                        <MdEdit size={18} />
                                    </Link>
                                    <button className="icon-btn" title="Delete">
                                        <MdDelete size={18} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    )
}