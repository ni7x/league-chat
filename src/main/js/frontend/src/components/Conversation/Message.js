import ReactTimeAgo from 'react-time-ago';

const Message = (props) => {


    return (
        <li className="message">
            <div className="content">
                <img src={"http://localhost:8080/uploads/avatars/" +  props.message.author.avatar} className="user-avatar" alt="Profile image"></img>
                <b><u>
                    {props.message.author.ingameName !== null ? props.message.author.ingameName : "[Deleted User]" }
                </u></b>
                <ReactTimeAgo className="date" onMouseEnter={null} date={props.message.createdAt} locale="en-US"/>
                <p>{props.message.content}</p>
            </div>
        </li>
       
    )
}
export default Message ;