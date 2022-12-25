import ReactTimeAgo from 'react-time-ago';

const Message = (props) => {
    return (
        <li className="message">
            <div className="content">
                <div className="left-side">
                    <img src={"http://localhost:8080/uploads/avatars/" +  props.message.author.avatar} className="user-avatar" alt="Profile image"></img>
                </div>
                <b><u>
                    {props.message.author.ingameName !== null ? props.message.author.ingameName : "[Deleted User]" }
                </u></b>
                <ReactTimeAgo className="date" onMouseEnter={null} date={Date.parse(props.message.createdAt)} locale="en-US"/>
                {props.message.isDeleted 
                    ? <p>Deleted message</p>
                    : <p>{props.message.content}</p>
                }
               
            </div>
        </li>
    )
}
export default Message ;