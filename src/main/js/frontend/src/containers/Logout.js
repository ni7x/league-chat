import { useEffect } from "react"

const Logout = () => {
    useEffect(() => {
        console.log("removing token");
        localStorage.removeItem("token");
    }, [])
    return(
        <>
            logout
        </>
    )
}

export default Logout;