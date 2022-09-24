import { useContext } from "react";
import { UserContext } from "../UserContext";

const URL_PREFIX = "http://127.0.0.1:8080";

export const useUserToken = () =>{
    return useContext(UserContext)?.token;
}

export const useUserDetails = () =>{
    return useContext(UserContext)?.user;
}

export const getUserByIGNandServer = async (ingameName, server, token) => {
    const URL = URL_PREFIX + "/api/user/name/" + ingameName + "/server/" + server;
    const response = await fetch(URL, {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token
        }
    });
    if(response.ok){
        return await response.json();
    }else{
        return Promise.reject("User not found");
    }
}

export const  isUserValid = (username, ingameName, password) =>{
    const PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$";
    if(username.length < 4 || username.length > 25){
        throw new Error("Username has to be longer than 4 and shorter than 25 characters")
    }
    if(ingameName.length < 2 || ingameName.length > 16){
        throw new Error("Ingame Name has to be longer than 2 and shorter than 16 characters")
    }
    if(password.length < 8 || password.length > 20){
        throw new Error("Password has to be longer than 8 and shorter than 20 characters")
    }
    if(!new RegExp(PASSWORD_PATTERN).test(password)){
        throw new Error("Password doesn't match the pattern")

    }
    return true;
}

export const getTypeFromErrorMessage = (message) => {
    message = message.toLowerCase();
    if(message.startsWith("password")){
        return "PASSWORD_ERROR";
    }
    if(message.startsWith("username")){
        return "USERNAME_ERROR";
    }
    if(message.startsWith("ingame name")){
        return "INGAME_NAME_ERROR";
    }
    return "UNKNOWN_ERROR";
}


export const updateUser = async (id, username, ingamename, password, positions, server, token) => {
    let data = {
        "id" : id,
        "username" : username,
        "ingameName" : ingamename,
        "password" :  password,
        "positions" :  positions,
        "server": server
    };
    const response = await fetch(URL_PREFIX + "/api/user/id/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Authorization" : "Bearer " + token,
            "Content-Type": "application/json"
    }});
    if(response.ok){
        return response;
    }else{
        let json = await response.json();
        let message = json.message;
        return Promise.reject(message);
    }
}

export const deleteUser = async (username, token) => {
    const data = await fetch(URL_PREFIX + "/api/user/username/" + username, {
        method: "DELETE",
        headers: {
            "Authorization" : "Bearer " + token,
    }});
    return data;
}

export const sendFriendRequest = async(fromUsername, toIngameName, server, token) => {
    let data = {
        "fromUsername": fromUsername ,
        "toIngameName" : toIngameName,
        "toServer": server 
    };
    const response = await fetch(URL_PREFIX + "/api/friendRequest", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Authorization" : "Bearer " + token,
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

export const endFriendship = async(fromUsername, toIngameName, server, token) => {
    let data = {
        "fromUsername": fromUsername ,
        "toIngameName" : toIngameName,
        "toServer": server 
    };
    const response = await fetch(URL_PREFIX + "/api/user/endFriendship", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Authorization" : "Bearer " + token,
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

export const answerFriendRequest = async (id, answer, token) => {
    const response = await fetch(URL_PREFIX + "/api/friendRequest/id/" + id + "/" + answer, {
        method: "DELETE",
        headers: {
            "Authorization" : "Bearer " + token,
            'Content-Type': 'application/json'
    }});
    if(response.ok){
        return response;
    }else{
        let json = await response.json();
        let message = json.message;
        return Promise.reject(message);
    }
}