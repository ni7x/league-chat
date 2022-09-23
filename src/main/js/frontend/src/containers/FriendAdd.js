import { useRef, useState, useEffect } from "react";
import { getUser } from "../services/AuthService";

const FriendAdd = () => {
    const formData = useRef();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(()=>{
        getUser().then((userData)=>setUserDetails(userData));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { friendName } = formData.current;
       
        let data = {
             "from": userDetails.username ,
             "to" : friendName.value,
          
        };
        const response = await fetch("http://127.0.0.1:8080/api/friendRequest/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json'
        }});
        if(response.ok){
            alert("Request send!")
        }else{
            alert("whoops")
        }
    }

    if(userDetails === null){
        return(
            <>Loading</>
        )
    }

    return(
        <>
            <form onSubmit={handleSubmit} ref={formData}>
                <input type="text" name="friendName"></input>
                <input  type="submit" value="Submit"></input>
            </form>
        </>
    )
}

export default FriendAdd;