import { useEffect, useRef, useState } from "react"
import { getUser, logout } from "../services/AuthService";

const UserSettings = () => {
    const [ user, setUser ] = useState(new Object());
    const formData = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let {username, ingameName, password, positions} = formData.current;
        let positionsArray = [];
        Array.from(positions.options).forEach(option => {
            if(option.selected){
                positionsArray.push(option.value)
            }
        });
        let data = {
             "id" : user.id,
             "username" : username.value,
             "ingameName" : ingameName.value,
             "password" :  password.value,
             "positions" :  positionsArray
        };
        const response = await fetch("http://127.0.0.1:8080/api/user/username/" + user.username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json'
        }});
        if(response.ok){
            
        }
    }

    const deleteUser = async () => {
        const response = await fetch("http://127.0.0.1:8080/api/user/username/" + user.username, {
            method: "DELETE",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token")
        }});
        if(response.ok){
            logout();
            window.location.href = "/login";
        }
    }

    useEffect(()=>{
        getUser().then((user)=>setUser(user));
    }, [])

    return(
        <>
            <form ref={formData} onSubmit={handleSubmit}>
                <label htmlFor="username">Edit Username: </label>
                <input type="text" name="username" defaultValue={user.username}></input>
                <label htmlFor="ingameName">Edit Ingame Name: </label>
                <input type="text" name="ingameName" defaultValue={user.ingameName}></input>
                <label htmlFor="password">Edit Password: </label>
                <input type="password" name="password" ></input>
                <select name="positions" multiple={true}>
                    <option name="TOPLANE" value="TOPLANE">TOP</option>
                    <option name="JUNGLE" value="JUNGLE">JG</option>
                    <option name="MIDLANE" value="MIDLANE">MID</option>
                    <option name="BOTTOM" value="BOTTOM">ADC</option>
                    <option name="SUPPORT" value="SUPPORT">SUPP</option>
                </select>
                <input type="submit" name="submit" placeholder="Submit"></input>
            </form>
            <button onClick={deleteUser}>Delete account</button>
        </>
    )
}
export default UserSettings;