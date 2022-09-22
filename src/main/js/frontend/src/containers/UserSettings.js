import { useEffect, useRef, useState } from "react"
import ServerSelect from "../components/ServerSelect";
import { getUser, logout, useUser, login } from "../services/AuthService";

const UserSettings = () => {
    const [ user, setUser ] = useUser(); 
    const [ userData, setUserData ] = useState(null);
    const formData = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let {username, ingameName, password, positions, server} = formData.current;
        let positionsArray = [];
        Array.from(positions.options).forEach(option => {
            if(option.selected){
                positionsArray.push(option.value)
            }
        });
        let data = {
             "id" : userData.id,
             "username" : username.value,
             "ingameName" : ingameName.value,
             "password" :  password.value,
             "positions" :  positionsArray,
             "server": server.value
        };
        const response = await fetch("http://127.0.0.1:8080/api/user/username/" + userData.username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Authorization" : "Bearer " + user,
                'Content-Type': 'application/json'
        }});
        if(response.ok){
            setUserData(await response.json());
            //addd handling for chaning username
        }else{
            let message = "Unknow error";
            let json = await response.json();
            message = json.message;
            alert(message);
        }
    }

    const deleteUser = async () => {
        const response = await fetch("http://127.0.0.1:8080/api/user/username/" + userData.username, {
            method: "DELETE",
            headers: {
                "Authorization" : "Bearer " + user,
        }});
        if(response.ok){
            logout();
            window.location.href = "/login";
        }
    }

    useEffect(()=>{
        getUser().then((userData)=>setUserData(userData));
    }, [])

    if(userData === null){
        return <>Wrong token</>
    }
    
    return(
        <>
            <form ref={formData} onSubmit={handleSubmit}>
                <label htmlFor="username">Edit Username: </label>
                <input type="text" name="username" defaultValue={userData.username}></input>
                <label htmlFor="ingameName">Edit Ingame Name: </label>
                <input type="text" name="ingameName" defaultValue={userData.ingameName}></input>
                <label htmlFor="password">Edit Password: </label>
                <input type="password" name="password" ></input>
                <select name="positions" multiple={true}>
                    <option name="TOPLANE" value="TOPLANE">TOP</option>
                    <option name="JUNGLE" value="JUNGLE">JG</option>
                    <option name="MIDLANE" value="MIDLANE">MID</option>
                    <option name="BOTTOM" value="BOTTOM">ADC</option>
                    <option name="SUPPORT" value="SUPPORT">SUPP</option>
                </select>
                <ServerSelect/>
                <input type="submit" name="submit" placeholder="Submit"></input>
            </form>
            <button onClick={deleteUser}>Delete account</button>
        </>
    )
}
export default UserSettings;