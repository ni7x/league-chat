import { useEffect, useState } from "react";

const Conversation = (props) => {
    let [ name, setName ] = useState("");
    let [ participantsNames, setParticipantsNames ] = useState([]);

    useEffect(()=>{
        console.log(props.conversation.lastMessage)

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

        props.conversation.participantsNames.filter(name => 
            name != props.ingameName
        ).forEach(element => {
            if(element != null){
                namesArray.push(element);
            }else{
                namesArray.push("[Deleted User]");
            }
        });

        setParticipantsNames(namesArray);
      
    }, [props])


      
       
    return (
        <li>
            <a href={"/conversation/" + props.conversation.id}><img src={process.env.PUBLIC_URL + "/profile-image.jpg"} alt="Profile image"></img></a>
            <div>
                <b>{participantsNames   } </b>
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