import { useEffect, useState } from "react"
import {getConversation, getConversations } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";
import { useParams } from 'react-router-dom';
import ConversationList from "./ConversationList";
import CurrentConversation from "./CurrentConversation";

const ConversationWrapper = (props) => {
    let [ userToken,  ] = useUserToken();
    let [ conversations, setConversations ]  = useState([]);
    let { id } = useParams();

    if(isNaN(id)){
        id = props.id;
    }

    useEffect(()=>{
        getConversations(userToken).then(response => response.json()).then(conversations=>setConversations(conversations));
    }, [])

    return(
        <div className="conversations">
            <div className="list">
                <ConversationList conversations={conversations}/>
            </div>
            <div className="current-conversation">
                <CurrentConversation id={id}/>
            </div>
         </div>
    )
}

export default ConversationWrapper;