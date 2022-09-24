const PositionSelect = (props) => {
    const positions = ["TOPLANE", "JUNGLE", "MIDLANE", "BOTTOM", "SUPPORT"];
    return(
            <select name="positions" multiple={true} defaultValue={props.current}>
                {positions.map((position)=>{
                    return <option key={position} name={position} value={position}>{position}</option>
                })}
            </select>
    )
}

export default PositionSelect;