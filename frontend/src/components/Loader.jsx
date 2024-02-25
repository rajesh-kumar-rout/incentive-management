export default function Loader({ size, variant }) {
    if (size === "full") {
        return (
            <div className="loader-page">
                <div className="loader loader-primary"></div>
            </div>
        )
    }

    return <div className={`loader ${size === "sm" ? "loader-sm" : null} loader-${variant}`}></div>
}