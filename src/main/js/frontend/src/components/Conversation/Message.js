const Message = (props) => {
    return (
        <li>
            {props.message.createdAt.substring(0, 10)} <b>{props.message.author.ingameName}: </b>
            {props.message.content}
        </li>
    )
}
export default Message ;