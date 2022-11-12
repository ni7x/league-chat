import { useUserDetails } from "../services/UserService";

const Home = () => {
    const [ userDetails, ] = useUserDetails();
    
    return(
        <>  
            <p>Hello, {userDetails.username} </p>
            <p>There are your account details: </p>
            <p>IGN: {userDetails.ingameName} #{userDetails.server}</p>
            <p>Your positions: 
            {userDetails.positions&& userDetails.positions.map((position)=>{
                return <span key={position}> {position} </span>
            })}
            </p>
        </>
    )
}

export default Home;