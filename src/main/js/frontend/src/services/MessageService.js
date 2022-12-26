const URL_PREFIX = "http://127.0.0.1:8080/api/conversation/";


export const getConversations = async (token) => {
    const response = await fetch(URL_PREFIX, {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token,
            "Content-Type": "application/json"
    }});
    if(response.ok){
        return response;
    }else{
        let json = await response.json();
        let message = json.message;
        console.log(response);
        return Promise.reject(message);
    }
}


export const getConversation = async (conversationId, token) => {
    const response = await fetch(URL_PREFIX + "id/" + conversationId, {
        method: "GET",
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

export const createConversation = async (name, userIdList, token) => {
    let data = {
        "name": name,
        "ids": userIdList
    };
    console.log(data)
    const response = await fetch(URL_PREFIX, {
        method: "POST",
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

export const createMessage = async (userId, messageContent, conversationId, token) => {
    let data = {
        "authorId" : userId,
        "content": messageContent,
        "conversationId" : conversationId,
    };
    const response = await fetch(URL_PREFIX + "createMessage", {
        method: "POST",
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
export const connect = () => {

}