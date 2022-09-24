import { answerFriendRequest, useUserDetails, useUserToken } from "../services/UserService";

const FriendRequest = (props) => {
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
            <b>FRIEND REQUEST</b>
            <p>from: {props.from.ingameName} </p>
            <button onClick={()=>handleAnswer("reject")}>Reject</button><button onClick={()=>handleAnswer("accept")}>Accept</button>
        </>
    )
}

export default FriendRequest;