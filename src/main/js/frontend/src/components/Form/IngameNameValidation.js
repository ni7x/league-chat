import { useEffect, useRef, useState } from "react";
import { checkIngameNameUniqueness } from "../../services/UserService";
import ServerSelect from "./ServerSelect";
const IngameNameValidation = (props) => {

    const [ isIngameNameLengthValid, setIsIngameNameLengthValid ] = useState(false);
    const [ isIngameNameUnqiue, setIsIngameNameUnique ] = useState(true);
    const [ server, setServer ] = useState("BR");
   

    useEffect(()=>{
        if(isIngameNameLengthValid && isIngameNameUnqiue){
            props.setIsIngameNameValid(true);
        }else{
            props.setIsIngameNameValid(false);
        }      
    })

  
    let ingameNameValidation = (e) => {
        
        if(e.target.value.length >= 2 && e.target.value.length <= 16){
            setIsIngameNameLengthValid(true);
            checkIngameNameUniqueness(e.target.value, server).then(result=>setIsIngameNameUnique(result)); 
        }else{
            setIsIngameNameLengthValid(false);
            setIsIngameNameUnique(true);
        }
    }

    return(
        <> 
            <label htmlFor="ingamename">Ingame Name: </label>
            <input type="text" name="ingamename" onKeyUp={ingameNameValidation} autoFocus={true}></input>
            <div className="tips">
                <p><span className={isIngameNameLengthValid ? "valid": null}>2-16 characters long</span></p>
                <p><span className="invalid" style={isIngameNameUnqiue ? {display: "none"} : {display: "block"}}>This ign is already taken on this server</span></p>
            </div>
            <label htmlFor="server">Server: </label>
            <ServerSelect setServer={setServer}/>
        </>
    )

}

export default IngameNameValidation;