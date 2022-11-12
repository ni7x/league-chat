import { endFriendship, useUserDetails, useUserToken } from "../../services/UserService";

const Friend = (props) => {
    const [ userDetails, setUserDetails ] = useUserDetails();
    const [ userToken, ] = useUserToken();
    const friendRemove = async (e) => {
        e.preventDefault();
    
        let data = await endFriendship(userDetails.username, props.ingameName, props.server, userToken);
        if(data.ok){
            let updatedUser = await data.json();
            setUserDetails(updatedUser);
        }else{
            console.log(data);
        }
    }
    return (
        <li>
            <a href={"/user/" + props.server + "/" + props.ingameName}><img src={process.env.PUBLIC_URL + "/profile-image.jpg"} alt="Profile image"></img></a>
            <span className="hidden-on-mobile">
                <p><a href={"/user/" + props.server + "/" + props.ingameName}>{props.ingameName}</a></p>
                <p>#{props.server}</p>
            </span>
        </li>
    )
}

export default Friend;