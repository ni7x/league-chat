const Conversation = (props) => {
    return (
        <li>
            <a href={"/conversation/" + props.conversation.id}><img src={process.env.PUBLIC_URL + "/profile-image.jpg"} alt="Profile image"></img></a>
            <div>
                <b>{props.conversation.participantsNames.filter(name => name != props.userName)} </b>
                {props.conversation.lastMessage != null ?
                    <p><i>{props.conversation.lastMessage.author.username == props.userName ? "You": props.conversation.lastMessage.author.username}: {props.conversation.lastMessage.content.slice(0, 20)}</i></p>
                :
                <p><i>Start the conversation!</i></p>
                 }
            </div>
        </li>
    )
}
export default Conversation ;