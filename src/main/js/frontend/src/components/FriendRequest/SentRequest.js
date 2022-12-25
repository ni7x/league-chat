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
            <img src={"http://localhost:8080/uploads/avatars/" + props.to.avatar} className="user-avatar" alt="Profile image"></img>
            <div className="text">
                <p>
                    <a href={"/user/" + props.to.server + "/" + props.to.ingameName}>{props.to.ingameName}</a>
                    <span> #{props.to.server}</span>
                </p>
                <button onClick={()=>handleAnswer("cancel")} className="decline">
                    Cancel Request
                </button>
            </div>
        </div>
    )
}

export default SentRequest;