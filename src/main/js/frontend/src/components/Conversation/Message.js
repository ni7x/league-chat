import ReactTimeAgo from 'react-time-ago';

const Message = (props) => {


    return (
        <li className="message">
            <div className="content">
                <b><u>{props.message.author.ingameName}</u></b>
                <ReactTimeAgo className="date" onMouseEnter={null} date={props.message.createdAt} locale="en-US"/>
                <p>{props.message.content}</p>
            </div>
        </li>
       
    )
}
export default Message ;