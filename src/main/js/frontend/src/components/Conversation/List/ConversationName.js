import { useState, useEffect } from "react";

const ConversationName = (props) => {
    let [ participantsNames, setParticipantsNames ] = useState([]);
    useEffect(()=>{
        let namesArray = [];
        props.conversation.participants
            .filter(participant =>participant.id != props.userId)
                .forEach(participant => {
                    if(participant.ingameName != null){
                        namesArray.push(participant.ingameName);
                        props.setConversationImage(participant.avatar);
                    }else{
                        namesArray.push("[Deleted User]");
                    }
                });
        setParticipantsNames(namesArray); 
    }, [props])

    return(
        <b>
             {props.conversation.name !== null && props.conversation.name !== "" 
                    ? props.conversation.name  
                    :
                    participantsNames.map(name=>{
                        if(name === "[Deleted User]"){
                            return <span className="deleted-user">{name}</span>
                        }else{
                            return name;
                        }
                    })
                }
                    
        </b>
    )
}

export default ConversationName;