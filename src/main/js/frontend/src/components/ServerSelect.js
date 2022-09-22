const ServerSelect = () => {
    const servers = ["BR", "EUNE", "EUW", "LAN", "LAS", "NA", "TR", "KR", "OCE", "RU", "JP"];
    return(
        <select name="server">
            {servers.map((server)=>{
                return <option key={server} name={server} value={server}>{server}</option>
            })}
         </select>
    )
}

export default ServerSelect;