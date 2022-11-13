const PositionSelect = (props) => {
    const positions = ["TOPLANE", "JUNGLE", "MIDLANE", "BOTTOM", "SUPPORT"];
    return(
            <div className="setting">
                <label htmlFor="positions">Positions:</label>
                <select name="positions" multiple={true} defaultValue={props.current}>
                    {positions.map((position)=>{
                        return <option key={position} name={position} value={position}>{position}</option>
                    })}
                </select>
            </div>
    )
}

export default PositionSelect;