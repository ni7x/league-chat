import { useEffect, useState } from "react"
import {getConversation, getConversations } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";
import { useParams } from 'react-router-dom';
import ConversationList from "./ConversationList";
import CurrentConversation from "./CurrentConversation";

const ConversationWrapper = () => {
    let [ userToken,  ] = useUserToken();
    let [ conversations, setConversations ]  = useState([]);
    let { id } = useParams();

    if(isNaN(id)){
        if(conversations.length > 0){
            if(!isNaN(conversations[0].id)){
                id  = conversations[0].id;
            }   
        }
    }

    useEffect(()=>{
        getConversations(userToken).then(response => response.json()).then(conversations => setConversations(conversations));
    }, [])

    if(!isNaN(id)){
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
   
}

export default ConversationWrapper;