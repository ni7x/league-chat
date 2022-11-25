import ConversationDetailed from "../components/Conversation/ConversationDetailed";
import ConversationList from "../components/Conversation/ConversationList";
import { useUserDetails } from "../services/UserService";
import "../styles/conversation.css";

const Home = (props) => {
    const [ userDetails, ] = useUserDetails();
    return(
        <div className="conversations">  
            <div className="list">
                <ConversationList conversations={userDetails.conversations}/>
            </div>
            <div className="current-conversation">
                {props.children}
            </div>
        </div>
    )
}

export default Home;