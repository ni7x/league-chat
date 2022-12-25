import { useEffect, useState } from "react";

const Conversation = (props) => {
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

        let namesArray = [];
        props.conversation.participants.filter(participant => 
            participant.name != props.ingameName
        ).forEach(participant => {
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
            <div>
                <b>{participantsNames} </b>
                {props.conversation.lastMessage != null ?
                    <p><i>{name}: {props.conversation.lastMessage.content.slice(0, 20)}</i></p>
                :
                <p><i>Start the conversation!</i></p>
                 }
            </div>
        </li>
    )
}
export default Conversation ;