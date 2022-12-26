import { useState } from "react";
import { createConversation } from "../../services/MessageService";
import { useUserDetails, useUserToken } from "../../services/UserService";

const CreateConversation = (props) => {
    const [ userDetails, ] = useUserDetails();
    const [ userToken, ] = useUserToken();
    const [ selected, setSelected ] = useState(new Map());

    let handleSubmit = (e) => { 
        e.preventDefault();
        let ids = [];
        ids.push(userDetails.id);
        selected.forEach((v, k) => {
            if(v === true){
                ids.push(k);
            }
        })
        createConversation(ids, userToken);
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
                            <b>Create new conversation</b>
                            <p>Select users you want to add</p>
                            {userDetails.friends.map(friend=>{
                            return(
                                <p>{friend.ingameName} #{friend.server} <input type="checkbox" onChange={e => toggleSelect(friend.id)} value={friend.id}></input></p>
                            ) 
                            })}
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