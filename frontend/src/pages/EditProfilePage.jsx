export default function EditProfilePage() {
    return (
        <form className="form" style={{ marginTop: 30 }}>
            <h3 className="form-title">Edit Profile</h3>

            <div className="form-group">
                <label htmlFor="oldPassword" className="form-label required">Name</label>
                <input type="password" className="form-control" name="oldPassword" id="oldPassword" />
            </div>
            <div className="form-group">
                <label htmlFor="newPassword" className="form-label required">Email</label>
                <input type="password" className="form-control" name="newPassword" id="newPassword" />
            </div>

            <button className="btn btn-primary btn-full">Save</button>
        </form>
    )
}