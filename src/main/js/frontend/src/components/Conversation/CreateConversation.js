import { useState } from "react";
import { createConversation } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";

const CreateConversation = (props) => {
    const [ userDetails, ] = useUserDetails();
    const [ userToken, ] = useUserToken();
    const [ selected, setSelected ] = useState(new Map());
    const [ name, setName ] = useState("");

    let handleSubmit = async (e) => { 
        e.preventDefault();
        let ids = [];
        ids.push(userDetails.id);
        selected.forEach((v, k) => {
            if(v === true){
                ids.push(k);
            }
        })
        let newConv = await createConversation(name, ids, userToken).then(response=>response.json());
        props.setConversations(conversations => [...conversations, newConv]);
        props.setActive(false);
    }

    let toggleSelect = (id) => {
        if(selected.has(id)){
            setSelected(selected=>new Map(selected.set(id, !selected.get(id))))
           
        }else{
            setSelected(selected=>new Map(selected.set(id, true)))
        }
    }

    return(
        <div className={"create-conversation-modal " + (props.isActive ? "active": "")}>
            <div className="create-conversation-wrapper"> 
                <div className="create-conversation">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>Conversation name:</p>
                            <input type="text" value={name} onChange={e=>setName(e.target.value)}></input>
                            <p>Conversation participants:</p>
                            <div className="friends-select">
                                {userDetails.friends.map(friend=>{
                                    return(
                                        <p key={friend.id} className={"friend-select " + (selected.get(friend.id) ? "selected" : "")} onClick={e => toggleSelect(friend.id)} value={friend.id}>
                                            {friend.ingameName} #{friend.server}
                                            <span><i className="fa-regular fa-circle-check"></i></span> 
                                        </p>
                                    ) 
                                })}
                            </div>
                        </div>
                        <div className="buttons">
                            <button type="button" onClick={e => props.setActive(false)}>Close</button>
                            <input type="submit" value="Create"></input>
                        </div>
                    </form>
                    
                </div>
            </div>
         </div>
    )
}

export default CreateConversation;