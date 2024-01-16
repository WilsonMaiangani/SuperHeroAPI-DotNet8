// const { error } = require("jquery");

let urlBase = "https://localhost:7019/api/superhero/";

const RequestGet = async (endpont,id = null ? null : 0) =>{    

    const result = await fetch(urlBase + endpont,{})    
    .then((response) => response.json())
    .then((data) => {        
        return data;
    });
    
    return result;     
}

const request = async (endpont, method, obj) => {    
    const result = await fetch(urlBase + endpont,{
        method: method,
        body: obj == null ? null: JSON.stringify(obj),
        // body: JSON.stringify(obj),
        headers: { "Content-type": "application/json" }        
    })
    // .then((response) => { body: obj == null ? null: JSON.stringify(obj) })
    .then((response) => {
        return response.json();
    })
    return result;
}

