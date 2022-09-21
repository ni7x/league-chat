import { useContext } from "react";
import { UserContext } from "../UserContext";

const URL_PREFIX = "http://127.0.0.1:8080";

export const useUser = () =>{
    return useContext(UserContext);
}

export const login = async (username, password) => {
        const response = await fetch(URL_PREFIX + "/token", {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(username + ":" + password)
            }
        });
        if(response.ok){
            let user = await response.text();
            localStorage.setItem("token", user);
            return user;
        }else{
            return Promise.reject("XD");
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
        return login(username, password);
    }else{
        return Promise.reject("XD");
    }
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const getUser = async (username) => {
    //jakis problem przy edytowaniu usera pewnie token z localsorage zawadza lub cus
    let URL = "";
    if(username === undefined){
        URL = URL_PREFIX + "/api/user/me";
    }else{
        URL = URL_PREFIX + "/api/user/username/" + username;
    }
    if(localStorage.getItem("token") !== null){
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token")
              }
        });
        if(response.ok){
            console.log(response);
            return response.json();
        }else{
            throw new Error("Couldn't get user");
        }
    }else{
        throw new Error("Couldn't get user (No token provided)");
    }
}


