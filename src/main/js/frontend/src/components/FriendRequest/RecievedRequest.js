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
            <img src={process.env.PUBLIC_URL + "/profile-image.jpg"} alt="Profile image"></img>
            <div className="text">
                <p>
                    <a href={"/user/" + props.from.server + "/" + props.from.ingameName}>{props.from.ingameName}</a>
                    <span> #{props.from.server}</span>
                </p>
                <div>
                    <button onClick={()=>handleAnswer("reject")} className="decline">
                        Reject
                    </button>
                    <button onClick={()=>handleAnswer("accept")} className="accept">
                        Accept
                    </button>
                </div>
            </div> 
        </div>
    )
}

export default RecievedRequest;