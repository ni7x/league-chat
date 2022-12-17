import ConversationWrapper from "../components/Conversation/ConversationWrapper";
import { useUserToken } from "../services/UserService";
import { getConversations } from "../services/MessageService";
import "../styles/conversation.css";

const Home = () => {
    return(
        <div className="home">  
            <ConversationWrapper id={3}/>
        </div>
    )
}

export default Home;