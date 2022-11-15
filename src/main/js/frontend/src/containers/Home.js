import { useUserDetails } from "../services/UserService";

const Home = () => {
    const [ userDetails, ] = useUserDetails();
    
    return(
        <>  
            There will be messages
        </>
    )
}

export default Home;