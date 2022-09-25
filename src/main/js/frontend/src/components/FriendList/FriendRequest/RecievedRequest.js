import { useUserToken, useUserDetails, answerFriendRequest } from "../../../services/UserService";

const RecievedRequest = (props) => {
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
            
            <p><a href={"/user/" + props.from.server + "/" + props.from.ingameName}>{props.from.ingameName}</a> wants to be friend</p>
            <i>S: {props.from.server} </i>
            <button onClick={()=>handleAnswer("reject")}>Reject</button><button onClick={()=>handleAnswer("accept")}>Accept</button>
        </>
    )
}

export default RecievedRequest;