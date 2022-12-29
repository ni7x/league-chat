import { useEffect, useRef, useState } from "react";
import {getConversation, leaveConversation,  } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";
import Message from "./Message";
import * as Stomp from 'stompjs';
import ConversationName from "./List/ConversationName";
import LoadingSpinner from "../LoadingSpinner";

const CurrentConversation = (props) => {
    let [ userToken,  ] = useUserToken();
    let [ userDetails, ] = useUserDetails(); 
    let [ messages, setMessages ] = useState([]);
    let [ conversation, setConversation ] = useState();
    let [ conversationImage, setConversationImage ] = useState("");
    let [ connected, setConnected ] = useState(false);
    let [ newMessage, setNewMessage ] = useState("");
    let [ isAllowed, setIsAllowed ] = useState(false); 
    let [ isLoading, setIsLoading ] = useState(false);
    const client = useRef(null);
    let bottomRef = useRef();

    useEffect(()=>{
        setIsAllowed(conversation && conversation.participants.filter(participant => participant.id === parseInt(userDetails.id)).length > 0);
    }, [conversation])


   
    let fetchMessages = () => {
        setIsLoading(true);
        getConversation(props.id, userToken).then(response=>response.json())
            .then(json=>{
                setConversation(json);
                setMessages(json.messages);  
                setIsLoading(false);
        }).catch(e => {
            setIsLoading(false);
            setIsAllowed(false);
        });
    }

    useEffect(()=>{
         fetchMessages();
    }, [])

    useEffect(()=>{
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
           
            if(json.type === "CREATE"){
                setMessages(messages=>[...messages, json.value]);
            }else if(json.type === "DELETE"){
                setMessages(messages =>
                    messages.map(message => {
                      if (message.id === json.value) {
                        return {...message, deleted: true};
                      }
                      return message;
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

    let leaveConv = async () => {
        await leaveConversation(props.id, userToken).then(response => response.json()).then(json => setConversation(json));
        props.getConversationPreviews();
    }

    if(isLoading){
        return <LoadingSpinner/>
    }

    if(!isAllowed){
        return <>You can't see this conversation</>
    }
   
    return (
       <>   
            <div className="conversation-top-panel">
                <div>
                    <img src={"http://localhost:8080/uploads/avatars/" + conversationImage}/>
                    {conversation && <ConversationName conversation={conversation} setConversationImage={setConversationImage} userId={userDetails.id}/> }
                </div>
                <button onClick={leaveConv}><i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
            <div className="messages">
                <ul>
                    {messages.map(message=>{
                            return <Message key={message.id} message={message} deleteMessage={deleteMessage} userId={userDetails.id}/>
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