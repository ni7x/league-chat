import { useEffect, useState } from "react";
import { checkIngameNameUniqueness } from "../../services/UserService";
import { useUserDetails } from "../../services/UserService";

const IngameNameValidation = (props) => {
    const [ userDetails,  ] = useUserDetails();
    const [ isIngameNameLengthValid, setIsIngameNameLengthValid ] =  useState(() => userDetails !== null ? true : false);
    const [ isIngameNameUnqiue, setIsIngameNameUnique ] = useState(true);

    useEffect(()=>{
        if(isIngameNameLengthValid && isIngameNameUnqiue){
            props.setIsIngameNameValid(true);
        }else{
            props.setIsIngameNameValid(false);
        }      
    })

  
    let ingameNameValidation = (e) => {
        if(userDetails !== null && (userDetails.ingameName === e.target.value || e.target.value === "")){
            setIsIngameNameLengthValid(true);
            setIsIngameNameUnique(true);
        }
        else if(e.target.value.length >= 2 && e.target.value.length <= 16){
            setIsIngameNameLengthValid(true);
            checkIngameNameUniqueness(e.target.value, props.server).then(result=>setIsIngameNameUnique(result)); 
        }else{
            setIsIngameNameLengthValid(false);
            setIsIngameNameUnique(true);
        }
    }

    return(
        <div className="setting"> 
            <label htmlFor="ingamename">Ingame Name: </label>
            <input type="text" name="ingamename" onKeyUp={ingameNameValidation} autoFocus={true} defaultValue={props.currentValue}></input>
            <div className="tips">
                <p><span className={isIngameNameLengthValid ? "valid": null}>2-16 characters long</span></p>
                <p><span className="invalid" style={isIngameNameUnqiue ? {display: "none"} : {display: "block"}}>This ign is already taken on this server</span></p>
            </div>
        </div>
    )

}

export default IngameNameValidation;