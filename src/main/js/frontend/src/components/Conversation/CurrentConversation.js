import { useEffect, useRef, useState } from "react";
import { createMessage } from "../../services/MessageService";
import {getConversation,  } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";
import Message from "./Message";
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

const CurrentConversation = (props) => {
    let [ userToken,  ] = useUserToken();
    let [ userDetails,  ] = useUserDetails(); 
    let [ messages, setMessages ] = useState([]);
    let [ connected, setConnected ] = useState(false);
    let [ newMessage, setNewMessage ] = useState("");

    const client = useRef(null);
    let bottomRef = useRef();

    let fetchMessages = () => {
        getConversation(props.id, userToken).then(response=>response.json()).then(json=>setMessages(json.messages));
    }

    useEffect(()=>{
        fetchMessages();
        connect();
    }, [])

    useEffect(()=>{
        scrollToBottom();
    }, [messages])

    let connect = () => {
        client.current = Stomp.client("ws://localhost:8080/stompOnly"); 
        client.current.reconnect_delay = 5000;
        client.current.connect({}, frame => {
          subscribe();
        })
    }

    let subscribe = () => {
        client.current.subscribe("/message/private/" + props.id, payload => {
            let json = JSON.parse(payload.body);
           
            if(json.type === "create"){
                setMessages(messages=>[...messages, json.value]);
            }else if(json.type === "delete"){
                setMessages(messages =>
                    messages.map(obj => {
                      if (obj.id === json.value) {
                        return {...obj, deleted: true};
                      }
              
                      return obj;
                    }),
                  );
            }
        });
        setConnected(true);
    }


    let sendMessage = (e) => {
        e.preventDefault();

        let data = {
            authorId :  userDetails.id,
            content:  newMessage,
            conversationId:  props.id,
        };
        
        if(connected){
            if(newMessage.length <= 2000){
                client.current.send('/app/conversation/'+ props.id, {}, JSON.stringify(data));
                setNewMessage("");
            }
           
        }   
    }

    let scrollToBottom = () => {
        bottomRef?.current?.scrollIntoView({ behavior: 'auto' })
    }

    let deleteMessage = (messageId) => {
        client.current.send('/app/conversation/'+ props.id + '/delete', {},  JSON.stringify(messageId));
    }

    return (
       <>   
            <div className="messages">
                <ul>
                    {messages.map(message=>{
                            return <Message key={message.id} message={message} deleteMessage={deleteMessage}/>
                    })}
                    <div ref={bottomRef}></div>
                </ul>
            </div>
            <form onSubmit={sendMessage} className="new-message">
                <input type="text" name="messageContent" onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}></input>
                <div className={newMessage.length > 2000 ? "error": ""}>{newMessage.length}/2000</div>
                <input type="submit" disabled={connected ? false: true}></input>
            </form>
        
       </>
    )
}
export default CurrentConversation;