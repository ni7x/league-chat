let User = (props) => {
    return(
        <div>
            <b>
                IGN: {props.ingameName}
            </b>
            {props.positions && props.positions.map((position, i)=>{
                return <p key={i}>{position}</p>
            })}
        </div>
    )
}

export default User;