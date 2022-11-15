import { useRef } from "react"
import { createMessage } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";

const Conversation = (props) => {
    let [ userDetails,  ] = useUserDetails(); 
    let [ userToken,  ] = useUserToken();
    let formData = useRef();
    let handleSubmit = (e) => {
        e.preventDefault();
        let { messageContent } = formData.current;
        createMessage(userDetails.id, messageContent.value, props.conversation.id, userToken);
    }
   
    return(
        <div>
          <p>Participants: </p>
          {props.conversation.participants.map((participant)=>{
            return <p key={participant.id}>{participant.ingameName}</p>
          })}
          <p>Messages:</p>
          {props.conversation.messages.map((message)=>{
            return <div key={message.id}>
                <p>author - {message.author.ingameName} :</p>
                {message.content}
            
            </div>
          })}
          <form onSubmit={handleSubmit} ref={formData}>
            <input type="text" name="messageContent"></input>
            <input type="submit"></input>
          </form>
         </div>
    )
}

export default Conversation;