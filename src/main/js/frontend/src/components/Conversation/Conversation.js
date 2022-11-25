const Conversation = (props) => {
    return (
        <li>
            <a href={"/conversation/" + props.conversation.id}><img src={process.env.PUBLIC_URL + "/profile-image.jpg"} alt="Profile image"></img></a>
            <p>{props.conversation.messages[props.conversation.messages.length - 1].author.ingameName}: {props.conversation.messages[props.conversation.messages.length - 1].content}</p>
            <span className="hidden-on-mobile">
                <p>{props.conversation.messages[props.conversation.messages.length - 1].author.ingameName}: {props.conversation.messages[props.conversation.messages.length - 1].content}</p>
            </span>
        </li>
    )
}
export default Conversation ;