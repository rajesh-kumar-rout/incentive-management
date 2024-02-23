export default function ChangePasswordPage(){
    return (
        <form className="form" style={{marginTop: 30}}>
            <h3 className="form-title">Change Password</h3>

            <div className="form-group">
                <label htmlFor="oldPassword" className="form-label required">Old Password</label>
                <input type="password" className="form-control" name="oldPassword" id="oldPassword" />
            </div>
            
            <div className="form-group">
                <label htmlFor="newPassword" className="form-label required">New Password</label>
                <input type="password" className="form-control" name="newPassword" id="newPassword" />
            </div>

            <div className="form-group">
                <label htmlFor="confirmNewPassword" className="form-label required">Confirm New Password</label>
                <input type="password" className="form-control" name="confirmNewPassword" id="confirmNewPassword" />
            </div>

            <button className="btn btn-primary btn-full">Change Password</button>
        </form>
    )
}