import Conversation from "./Conversation.js";
const ConversationList = (props) => {
    //set conv from api
    return(
            <ul>
                {props.conversations.map(conversation=>{
                    return <Conversation conversation={conversation}/>
                })}
            </ul>
        
    )
}

export default ConversationList;