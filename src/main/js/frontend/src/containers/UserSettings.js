import { useEffect, useRef, useState } from "react"
import ServerSelect from "../components/ServerSelect";
import { getUser, logout, useUserToken, login } from "../services/AuthService";

const UserSettings = () => {
    const [ userToken, setUserToken ] = useUserToken(); 
    const [ userDetails, setUserDetails ] = useState(null);
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
             "id" : userDetails.id,
             "username" : username.value,
             "ingameName" : ingameName.value,
             "password" :  password.value,
             "positions" :  positionsArray,
             "server": server.value
        };
        const response = await fetch("http://127.0.0.1:8080/api/user/username/" + userDetails.username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Authorization" : "Bearer " + userToken,
                'Content-Type': 'application/json'
        }});
        console.log(response)
        if(response.ok){
            if(username.value !== userDetails.username){
                setUserToken(null);
                logout();
            }
            setUserDetails(await response.json());
            
            //addd handling for chaning username
        }else{
            let message = "Unknow error";
            console.log(response);
            let json = await response.json();
            message = json.message;
            alert(message);
        }
    }

    const deleteUser = async () => {
        const response = await fetch("http://127.0.0.1:8080/api/user/username/" + userDetails.username, {
            method: "DELETE",
            headers: {
                "Authorization" : "Bearer " + userToken,
        }});
        if(response.ok){
            logout();
            window.location.href = "/login";
        }
    }

    useEffect(()=>{
        getUser().then((userData)=>setUserDetails(userData));
    }, [])

    if(userDetails === null){
        return(
            <>Loading</>
        )
    }

    return(
        <>
            <form ref={formData} onSubmit={handleSubmit}>
                <label htmlFor="username">Edit Username: </label>
                <input type="text" name="username" defaultValue={userDetails.username}></input>
                <label htmlFor="ingameName">Edit Ingame Name: </label>
                <input type="text" name="ingameName" defaultValue={userDetails.ingameName}></input>
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