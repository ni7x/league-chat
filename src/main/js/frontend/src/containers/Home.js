import Conversation from "../components/Conversation/Conversation";
import { useUserDetails } from "../services/UserService";

const Home = () => {
    const [ userDetails, ] = useUserDetails();
    
    return(
        <>  
            {userDetails.conversations.map((conversation) => {
                return <Conversation key={conversation.id} conversation={conversation}/>
            })}
        </>
    )
}

export default Home;