import Friend from "./Friend";
const FriendList = (props) => {

    if(props.friends.length > 0){
        return(
            <>
                {props.friends.map(friend => {
                    return <Friend key={friend.id} id={friend.id} ingameName={friend.ingameName} username={friend.username} server={friend.server} for={props.for}/>
                })}
            </>
        )  
    }else{
        return(<>
                You have no friends curreentyl...
             </>)
    }

   
}
export default FriendList;