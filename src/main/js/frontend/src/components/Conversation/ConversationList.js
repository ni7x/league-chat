import Conversation from "./Conversation.js";
import { useUserDetails, useUserToken } from "../../services/UserService.js";

const ConversationList = (props) => {
    let [ userDetails, ] = useUserDetails();
    return(
            <ul>
                {props.conversations.map(conversation=>{
                    return <Conversation key={conversation.id} conversation={conversation} ingameName={userDetails.ingameName}/>
                })}
            </ul>
        
    )
}

export default ConversationList;