import { useRef } from "react";

const Login = () => {
    
    const formData = useRef();
    
    const handleSubmit = (e) => {

        e.preventDefault();
        const { username, password } = formData.current;

        fetch("http://127.0.0.1:8080/token", {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(username.value + ":" + password.value)
              }
        }).then((response) => {
            if(response.ok){
                response.text().then((token) => {
                    console.log("Token got set to ====" + token);
                    localStorage.setItem("token", token)
                })
            }else{
                console.log("Login failed");
                console.log(response);
            }
        })

    }

    return(
        <>
            <form onSubmit={handleSubmit} ref={formData}>
                <input type="text" name="username"></input>
                <input type="password" name="password"></input>
                <input type="submit" name="submit" placeholder="submit"></input>
            </form>
        </>
    )
}

export default Login;