import FriendRequest from "./FriendRequest";

let User = (props) => {
    return(
        <div>
            <b>
                IGN: {props.ingameName}
            </b>
            Positons:
            {props.positions && props.positions.map((position, i)=>{
                return <p key={i}>{position}</p>
            })}
            Friend Requests:
            {props.friendRequests && props.friendRequests.map((friendRequest)=>{
                return <FriendRequest key={friendRequest.id} from={friendRequest.from} id={friendRequest.id} />
            })}
            <p>Server: {props.server} </p>
        </div>
    )
}

export default User;