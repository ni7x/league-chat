import FriendList from "../components/FriendList/FriendList";
import User from "../components/User";
import { useUserDetails } from "../services/UserService";

const Home = () => {
    const [ userDetails, ] = useUserDetails();

    return(
        <>  
            <User ingameName={userDetails.ingameName} positions={userDetails.positions} server={userDetails.server} friendRequests={userDetails.friendRequestsTo}/>
            <p>Friends: </p>
            <FriendList for={userDetails.username} friends={userDetails.friends}/>
        </>
    )
}

export default Home;