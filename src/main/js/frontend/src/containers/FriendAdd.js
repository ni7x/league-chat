import { useRef, useState, useEffect } from "react";
import { getUser } from "../services/AuthService";

const FriendAdd = () => {
    const formData = useRef();
    const [user, setUser] = useState(new Object());

    useEffect(()=>{
        getUser().then((user)=>setUser(user));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { friendName } = formData.current;
       
        let data = {
             "username": user.username ,
             "friendName" : friendName.value,
          
        };
        const response = await fetch("http://127.0.0.1:8080/api/user/addFriend/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json'
        }});
        console.log(response);
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