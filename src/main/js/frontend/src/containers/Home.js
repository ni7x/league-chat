import { useEffect, useState } from "react";

const Home = () => {
    const [ userInfo, setUserInfo ] = useState(new Object());
    useEffect(() => {
        fetch("http://127.0.0.1:8080/api/user/me", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token")
              }
        }).then((response) => response.json()).then((json) => setUserInfo(json));
    }, [])

    return(
        <>
          Username:  {userInfo.username}
        </>
    )
}

export default Home;