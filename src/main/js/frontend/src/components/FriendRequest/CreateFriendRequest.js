import { useEffect, useRef, useState } from "react";
import { sendFriendRequest, useUserDetails, useUserToken } from "../../services/UserService";
import ServerSelect from "../Form/ServerSelect";

const CreateFriendRequest = (props) => {
    const formData = useRef();
    const [ userDetails, setUserDetails ] = useUserDetails();
    const [ userToken, ] = useUserToken();
    const [ errorMessage, setErrorMessage ] = useState(""); 
    const [ suggestions, setSuggestions ] = useState([]);
    const [ ingameName, setIngameName ] = useState(""); 
    const [ server, setServer ] = useState("BR");

    let changeInputText = (e) => {
        setIngameName(e.target.innerText);
    }

    useEffect(()=>{
        async function fetchData() {
            const URL = "http://127.0.0.1:8080/api/user/autoSuggestion";
            let { friendName, server } = formData.current;
            let data = {"suggested_ign": friendName.value, "server":server.value, "current_user_ign": userDetails.ingameName};
            const response =  await fetch(URL, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.ok){
                setSuggestions(await response.json());
            }else{
                console.log(response);
            }
        }
        fetchData();

    }, [ingameName])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let { friendName, server } = formData.current;
        try{
            const data = await sendFriendRequest(userDetails.username, friendName.value, server.value, userToken);
            let updatedUser = await data.json();
            setErrorMessage("Request send");
            setUserDetails(updatedUser);
            setIngameName("");
        }catch(err){
            setErrorMessage(err);
        }
    }

    if(userDetails === null){
        return(
            <>Loading</>
        )
    }
    
    return(
        <div className="friend-search-wrapper"> 
            <div>
                <div className="friend-search">
                    <form onSubmit={handleSubmit} ref={formData}>
                        <ServerSelect setServer={setServer}/>
                        <input  type="submit" value="Invite"></input>
                        <input type="text" name="friendName" value={ingameName}  onChange={e=>setIngameName(e.target.value)}></input>
                    </form>
                </div>            
                <div className="auto-suggestions">
                    {suggestions.map(suggestion => {
                        return <p key={suggestion} onClick={changeInputText}><span>{suggestion}</span></p>
                    })}
                </div>
            </div>
            
            <div>            
                <p className={errorMessage === "Request send" ? "success": "error"}>{errorMessage}</p>
                <button onClick={props.toggleActive} className="close-button">Close</button>
            </div>
        </div>
    )
}

export default CreateFriendRequest;