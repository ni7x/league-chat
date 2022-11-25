import { useEffect, useRef, useState } from "react"
import { createMessage, getConversation } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";
import { useParams } from 'react-router-dom';

const ConversationDetailed = (props) => {
    let [ userDetails,  ] = useUserDetails(); 
    let [ userToken,  ] = useUserToken();
    let [ messages, setMessages ] = useState([]);
    let { id } = useParams();

    let formData = useRef();


    useEffect(()=>{
        getConversation(id, userToken).then(response=>response.json()).then(json=>setMessages(json.messages))
    }, [])

    let handleSubmit = (e) => {
        e.preventDefault();
        let { messageContent } = formData.current;
        createMessage(userDetails.id, messageContent.value, props.conversation.id, userToken);
    }
   
    return(
        <div className="">
            {messages.map(message=>{
                return <p key={message.id}>{message.author.ingameName}: {message.content}</p>
            })}
         </div>
    )
}

export default ConversationDetailed;