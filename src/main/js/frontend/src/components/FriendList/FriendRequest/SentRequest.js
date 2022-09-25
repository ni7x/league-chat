import { useUserToken, useUserDetails, answerFriendRequest } from "../../../services/UserService";

const SentRequest = (props) => {
    const [, setUserDetails] = useUserDetails();
    const [userToken, ] = useUserToken();

    const handleAnswer = async (action) => {
        const data = await answerFriendRequest(props.id, action, userToken);
        if(data.ok){
            let updatedUser = await data.json();
            setUserDetails(updatedUser);
        }else{
            console.log(data);
        }
    } 
    
    return(
        <>  
            
            <p>Request to: <a href={"/user/" + props.to.server + "/" + props.to.ingameName}>{props.to.ingameName}</a></p>
            <i>S: {props.to.server} </i>
            <button onClick={()=>handleAnswer("cancel")}>Cancel</button>
        </>
    )
}

export default SentRequest;