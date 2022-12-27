import { useEffect, useState } from "react"
import {getConversation, getConversations } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";
import { useParams } from 'react-router-dom';
import ConversationList from "./List/ConversationList";
import CurrentConversation from "./CurrentConversation";
import CreateConversation from "./CreateConversation";

const ConversationWrapper = () => {
    let [ userToken,  ] = useUserToken();
    let [ conversations, setConversations ]  = useState([]);
    let { id } = useParams();
    let [ isCreateConversationShown, setIsCreateConversationShown ] = useState(false);

    if(isNaN(id)){
        if(conversations.length > 0){
            if(!isNaN(conversations[0].id)){
                id  = conversations[0].id;
            }   
        }
    }

    let getConversationPreviews =  () => {
         getConversations(userToken).then(response => response.json()).then(conversations => setConversations(conversations));
    }
    

    useEffect(()=>{
        getConversationPreviews();
    }, [])

   
        return( 
            <div className="conversations">
                <CreateConversation isActive={isCreateConversationShown} setActive={setIsCreateConversationShown} setConversations={setConversations}/>
                 <div className="list">
                    <div className="top-panel">
                         <button onClick={e => setIsCreateConversationShown(true)}><i className="fa-solid fa-square-plus"></i></button>
                    </div>
                    
                    <ConversationList conversations={conversations}/>
                 </div>
                <div className="current-conversation">
                    {!isNaN(id) ?  <CurrentConversation id={id} getConversationPreviews={getConversationPreviews}/> : null }
                </div>
            </div>
        )
    
   
}

export default ConversationWrapper;