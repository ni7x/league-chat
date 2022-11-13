const ServerSelect = (props) => {
    const servers = ["BR", "EUNE", "EUW", "LAN", "LAS", "NA", "TR", "KR", "OCE", "RU", "JP"];

    return(
        <div className="setting">
            <label htmlFor="server">Server: </label>
            <select name="server" defaultValue={props.currentValue} onChange={(e) => props.setServer(e.target.value)}>
                {servers.map((server)=>{
                    return <option key={server} name={server} value={server}>{server}</option>
                })}
            </select>
         </div>
    )
}

export default ServerSelect;