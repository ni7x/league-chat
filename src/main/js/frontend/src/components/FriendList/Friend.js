const Friend = (props) => {
    const friendRemove = async (e, friendName) => {
        e.preventDefault();
     
        let data = {
             "username": props.for,
             "friendName" : friendName,
        };

        const response = await fetch("http://127.0.0.1:8080/api/user/removeFriend/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json'
        }});
        if(response.ok){
            alert("ok");
        }
    }
    return (
        <>
            <div>
                <button onClick={(e) => friendRemove(e, props.username)}>remove</button>
                <p><a href={"user/" + props.username}>{props.ingameName}</a></p>
                <i>{props.server}</i>
            </div>
        </>
    )
}

export default Friend;