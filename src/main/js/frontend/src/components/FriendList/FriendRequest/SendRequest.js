import { useUserToken, useUserDetails, answerFriendRequest } from "../../../services/UserService";

const SendRequest = (props) => {
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
            
            <p>Request to: {props.to.ingameName}</p>
            <button onClick={()=>handleAnswer("cancel")}>Cancel</button>
        </>
    )
}

export default SendRequest;