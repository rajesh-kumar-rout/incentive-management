export default function DeniedPage(){
    const params = new URLSearchParams(window.location.search)

    return (
        <div className="page-center">
            <h2>{params.get("message") ?? "Access denied"}</h2>
        </div>
    )
}