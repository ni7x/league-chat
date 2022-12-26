import { useEffect, useState } from "react";
import ConversationLastMessage from "./ConversationLastMessage";
import ConversationName from "./ConversationName";

const ConversationPreview = (props) => {
    let [ conversationImage, setConversationImage ] = useState("");

    return (
        <li>
            <a href={"/conversation/" + props.conversation.id}><img src={"http://localhost:8080/uploads/avatars/" + conversationImage}/></a>
            <div className="hidden-on-tablet">
                <ConversationName conversation={props.conversation} setConversationImage={setConversationImage} userId={props.userId}/>
                <ConversationLastMessage conversation={props.conversation}  ingameName={props.ingameName}/>
            </div>
        </li>
    )
}
export default ConversationPreview ;