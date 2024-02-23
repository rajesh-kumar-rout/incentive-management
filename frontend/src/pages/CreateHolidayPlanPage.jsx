export default function CreateHolidayPlanPage(){
    return (
        <form className="form" style={{marginTop: 30}}>
            <h3 className="form-title">Add Holiday Plan</h3>

            <div className="form-group">
                <label htmlFor="oldPassword" className="form-label required">Name</label>
                <input type="password" className="form-control" name="oldPassword" id="oldPassword" />
                <span className="form-error">Name is required</span>
            </div>

            <div className="form-group">
                <label htmlFor="duration" className="form-label required">Duration (Night)</label>
                <input type="number" className="form-control" name="duration" id="duration" />
            </div>

            <div className="form-group">
                <label htmlFor="destination" className="form-label required">Destination</label>
                <input type="password" className="form-control" name="destination" id="destination" />
            </div>

            <div className="form-group">
                <label htmlFor="location" className="form-label required">Location</label>
                <input type="password" className="form-control" name="location" id="location" />
            </div>

            <div className="form-group">
                <label htmlFor="amenities" className="form-label">Amenities</label>
                <input type="text" className="form-control" name="amenities" id="amenities" />
                <span className="form-helptext">Write in comma separated way</span>
            </div>

            <button className="btn btn-primary btn-full">Save</button>
        </form>
    )
}