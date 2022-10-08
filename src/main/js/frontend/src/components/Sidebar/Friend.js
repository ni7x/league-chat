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
        <div>
            <div>
                <p><a href={"/user/" + props.server + "/" + props.ingameName}>{props.ingameName}</a> #{props.server}</p>
                <button onClick={friendRemove}><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
    )
}

export default Friend;