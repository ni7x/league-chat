const ServerSelect = (props) => {
    const servers = ["BR", "EUNE", "EUW", "LAN", "LAS", "NA", "TR", "KR", "OCE", "RU", "JP"];
    return(
        <select name="server" defaultValue={props.current}>
            {servers.map((server)=>{
                return <option key={server} name={server} value={server}>{server}</option>
            })}
         </select>
    )
}

export default ServerSelect;