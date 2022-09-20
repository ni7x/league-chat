const URL_PREFIX = "http://127.0.0.1:8080";

export const login = async (username, password) => {
    const response = await fetch(URL_PREFIX + "/token", {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        }
    });

    if (response.ok) {
        response.text().then((token) => {
            localStorage.setItem("token", token);
        });
    }else {
        throw new Error("Couldn't login!");
    }
}

export const logout = () => {
    localStorage.removeItem("token");
}

export const register = async (username, ingameName,  password) => {
    const data = {
        "username": username, 
        "ingameName": ingameName,
        "password": password
    };
    
    const response = await fetch(URL_PREFIX + "/api/user/save", {
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
    }});

     if(response.ok){
        login(username, password);
     }else{
        throw new Error("Couldn't register!");
     }
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const getUser = async (username) => {
    let URL = "";
    if(username === undefined){
        URL = "http://127.0.0.1:8080/api/user/me";
    }else{
        URL = "http://127.0.0.1:8080/api/user/username/" + username;
    }

    if(localStorage.getItem("token") !== null){
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token")
              }
        });
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Couldn't get user");
        }
    }else{
        throw new Error("Couldn't get user(No token provided)");
    }
}

