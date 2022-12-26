import ConversationPreview from "./ConversationPreview.js";
import { useUserDetails, useUserToken } from "../../services/UserService.js";

const ConversationList = (props) => {
    let [ userDetails, ] = useUserDetails();
    return(
            <ul>
                {props.conversations.map(conversation=>{
                    return <ConversationPreview key={conversation.id} conversation={conversation} ingameName={userDetails.ingameName} userId={userDetails.id}/>
                })}
            </ul>
        
    )
}

export default ConversationList;