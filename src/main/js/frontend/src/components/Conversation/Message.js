import ReactTimeAgo from 'react-time-ago';

const Message = (props) => {
    return (
        <li className="message">
            <div className="content">
                <div className="left-side">
                    <img src={"http://localhost:8080/uploads/avatars/" +  props.message.author.avatar} className="user-avatar" alt="Profile image"></img>
                </div>
                <b>
                    {props.message.author.ingameName !== null 
                        ? <u>{props.message.author.ingameName}</u>
                        : <span className="deleted-user">[Deleted User]</span> 
                    }
                </b>
                <ReactTimeAgo className="date" onMouseEnter={null} date={Date.parse(props.message.createdAt)} locale="en-US"/>

                {!props.message.deleted && props.userId === props.message.author.id
                    ? <button onClick={e => props.deleteMessage(props.message.id)} className="delete-message"><i className="fa-solid fa-trash-can"></i> </button>
                    : null
                }

                {props.message.deleted 
                    ? <p className="deleted-message">Deleted message</p>
                    : <p>{props.message.content}</p>
                }

                
               
            </div>
        </li>
    )
}
export default Message ;