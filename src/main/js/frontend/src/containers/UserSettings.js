import { useEffect, useState } from "react"
import { getUser } from "../services/AuthService";

const UserSettings = () => {
    const [ user, setUser ] = useState(new Object());

    useEffect(()=>{
        getUser().then((user)=>setUser(user));
        console.log(user)
    }, [])

    return(
        <>
            <form>
                <label htmlFor="username">Edit Username: </label>
                <input type="text" name="username" value={user.username}></input>
                <label htmlFor="ingameName">Edit Ingame Name: </label>
                <input type="text" name="ingameName" value={user.ingameName}></input>
                <label htmlFor="password">Edit Password: </label>
                <input type="password" name="password" ></input>
                <input type="submit" name="submit" placeholder="Submit"></input>
            </form>
            <button>Delete account</button>
        </>
    )
}
export default UserSettings;