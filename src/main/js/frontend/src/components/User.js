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
           
            <p>Server: {props.server} </p>
        </div>
    )
}

export default User;