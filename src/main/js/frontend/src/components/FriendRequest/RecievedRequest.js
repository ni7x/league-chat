import { useUserToken, useUserDetails, answerFriendRequest } from "../../services/UserService";

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
        <div className="friend-request">    
            <i>Friend request</i>  
            <p>
                <a href={"/user/" + props.from.server + "/" + props.from.ingameName}>{props.from.ingameName}</a>
                <span> #{props.from.server}</span>
            </p>   
            <button onClick={()=>handleAnswer("reject")} className="decline">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button onClick={()=>handleAnswer("accept")} className="accept">
                <i class="fa-solid fa-check"></i>
            </button>
        </div>
    )
}

export default RecievedRequest;