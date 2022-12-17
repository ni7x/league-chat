import { useEffect, useRef, useState } from "react";
import { createMessage } from "../../services/MessageService";
import {getConversation,  } from "../../services/MessageService";

import { useUserDetails, useUserToken } from "../../services/UserService";
import Message from "./Message";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

let client = null;

const CurrentConversation = (props) => {
    let [ userToken,  ] = useUserToken();
    let [ userDetails,  ] = useUserDetails(); 
    let [ messages, setMessages ] = useState([]);

    useEffect(()=>{
        getConversation(props.id, userToken).then(response=>response.json()).then(json=>setMessages(json.messages));
    }, [])

    useEffect(()=>{
        scrollToBottom();
    }, [messages])


    let formData = useRef();
    let bottomRef = useRef();

    useEffect(()=>{
        let sock = new SockJS("/stomp");
        client = Stomp.over(sock); 
        client.connect({"Authorization" : "Bearer " + userToken}, frame => {
            client.subscribe("/message/private/" + props.id, payload => {
                setMessages(messages=>[...messages, JSON.parse(payload.body)]);
            });
        })
    }, [])

    let sendMessage = (e) => {
        e.preventDefault();
        let { messageContent } = formData.current;

        let data = {
            authorId :  userDetails.id,
            content:  messageContent.value,
            conversationId:  props.id,
        };
        
        if(client){
            client.send('/app/conversation/'+ props.id, {}, JSON.stringify(data));
        }
    
    }

    let scrollToBottom = () => {
        bottomRef?.current?.scrollIntoView({ behavior: 'auto' })
    }


    return (
       <>   
            <div className="messages">
                <ul>
                    {messages.map(message=>{
                            return <Message message={message} />
                    })}
                    <div ref={bottomRef}></div>
                </ul>
            </div>
            <form onSubmit={sendMessage} ref={formData} className="new-message">
                <input type="text" name="messageContent"></input>
                <input type="submit"></input>
            </form>
        
       </>
    )
}
export default CurrentConversation;