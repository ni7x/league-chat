import { useUserToken, useUserDetails, answerFriendRequest } from "../../services/UserService";

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
        <div className="friend-request"> 
            <i>Your request</i>    
            <p>
                <a href={"/user/" + props.to.server + "/" + props.to.ingameName}>{props.to.ingameName}</a>
                <span> #{props.to.server}</span>
            </p>
            <button onClick={()=>handleAnswer("cancel")} className="decline">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    )
}

export default SentRequest;