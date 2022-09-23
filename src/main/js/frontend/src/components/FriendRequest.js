import { useUserToken } from "../services/AuthService";

const FriendRequest = (props) => {
    const [user, setUser] = useUserToken();

    const requestAction = async (e, action) => {
        e.preventDefault();
      
        const response = await fetch("http://127.0.0.1:8080/api/friendRequest/id/" + props.id + "/" + action, {
            method: "PUT",
            headers: {
                "Authorization" : "Bearer " + user,
                'Content-Type': 'application/json'
        }});
        if(response.ok){
            alert("ok")
        }else{
           alert("n ok");
        }
    }

  
    const reject = (e) => {
        requestAction(e, "reject");
    }
    const accept = (e) => {
        requestAction(e, "accept");
    }
    
    return(
        <>  <b>FRIEND REQUEST</b>
            <p>from: {props.from.ingameName} </p>
            <button onClick={reject}>Reject</button><button onClick={accept}>Accept</button>
        </>
    )
}

export default FriendRequest;