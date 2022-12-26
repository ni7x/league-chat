import { useEffect, useState } from "react";

const ConversationPreview = (props) => {
    let [ name, setName ] = useState("");
    let [ participantsNames, setParticipantsNames ] = useState([]);
    let [ conversationImage, setConversationImage ] = useState("");

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
        console.log(props.conversation.participants)

        let namesArray = [];
        props.conversation.participants
            .filter(participant =>participant.name != props.ingameName)
                .forEach(participant => {
                    if(participant.name != null){
                        namesArray.push(participant.name);
                        setConversationImage(participant.avatar);
                    }else{
                        namesArray.push("[Deleted User]");
                    }
                });
        setParticipantsNames(namesArray);
      
    }, [props])

    return (
        <li>
            <a href={"/conversation/" + props.conversation.id}><img src={"http://localhost:8080/uploads/avatars/" + conversationImage}/></a>
            <div className="hidden-on-tablet">
                <b>
                    {participantsNames.map(name=>{
                        if(name === "[Deleted User]"){
                            return <span className="deleted-user">{name}</span>
                        }else{
                            return name;
                        }
                    })} 
                </b>
                <p><i>
                {name === "Deleted User" 
                    ? <span className="deleted-user">{name}</span>
                    : name
                }:&nbsp;
                {props.conversation.lastMessage != null 
                    ? !props.conversation.lastMessage.deleted
                        ? props.conversation.lastMessage.content.slice(0, 20)
                        : <span className="deleted-message">Deleted Message</span>
                    : <i>Start the conversation!</i>
                 }
                 </i></p>
            </div>
        </li>
    )
}
export default ConversationPreview ;