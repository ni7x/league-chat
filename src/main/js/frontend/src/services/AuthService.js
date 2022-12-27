const URL_PREFIX = "http://127.0.0.1:8080/api/";

export const login = async (username, password) => {
    const response = await fetch(URL_PREFIX + "tokens", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
        }
    });
    if(response.ok){
        let tokens = await response.json();
        localStorage.setItem("token", tokens.accessToken);
        return tokens.accessToken;
    }else{
        return Promise.reject("Couldn't authorize");
    }   
}

export const logout = () => {
    localStorage.removeItem("token");
}

export const register = async (username, email, ingameName, password, server) => {
    const data = {
        "username": username, 
        "email": email,
        "ingameName": ingameName,
        "password": password,
        "server": server
    };
    const response = await fetch(URL_PREFIX + "user/save", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(response.ok){
        return login(username, password);
    }else{
        let json = await response.json();
        let message = json.message;
        return Promise.reject(message);
    }
}

export const forgotPassword = async ( email ) => { 
    const response = await fetch(URL_PREFIX + "user/forgotPassword", {
        method: "POST",
        body: email,
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(response.ok){
      return response;
    }else{
        let json = await response.json();
        let message = json.message;
        return Promise.reject(message);
    }   
}

export const changePassword = async (password, token) => {
    const data = {   
        "password": password,
        "token": token
    };
    const response = await fetch(URL_PREFIX + "user/changePassword", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(response.ok){
        let json = await response.json();
        return login(json.username, password);
    }else{
        let json = await response.json();
        let message = json.message;
        return Promise.reject(message);
    }
}