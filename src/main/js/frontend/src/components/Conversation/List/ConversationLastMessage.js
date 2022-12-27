import { useState, useEffect } from "react";

const ConversationLastMessage = (props) => {
    let [ name, setName ] = useState("");

    useEffect(()=>{
        if(props.conversation.lastMessage != null){
            if(props.conversation.lastMessage.author.ingameName == props.ingameName){
                setName("You");
            }else if(props.conversation.lastMessage.author.ingameName  == null){
                setName("[Deleted User]");
            }else{
                setName(props.conversation.lastMessage.author.ingameName);
            }
        }
      
    }, [props])
   

    return(
        <p>
            <span className="preview-message">
                    {name === "Deleted User" 
                        ? <span className="deleted-user">{name}</span>
                        : name
                    }
                    {props.conversation.lastMessage != null 
                        ? !props.conversation.lastMessage.deleted
                            ? <>: {props.conversation.lastMessage.content.slice(0, 20)}</> 
                            : <span className="deleted-message">: Deleted Message</span>
                        : <>Start the conversation!</>
                    }
                 </span>
        </p>
    )
}

export default ConversationLastMessage;