const axios = require('axios');
const {token} = require('./constants');
const config = { headers: { Authorization: `Bearer ${token}`}};

async function getTeams(idLeague){
    let res;
    try {
        res = await axios.get(`https://api-fantasy.llt-services.com/api/v3/leagues/${idLeague}/teams`, config)
        
        if (res.status === 200){ 
            return res.data;
        }
        return JSON.stringify({error: `${res.status} - ${res.statusText}`});
    }
    catch (err) {
        console.error(err);
        return JSON.stringify({error: `${err.response.status} - ${err.response.statusText}`});
    }
}

module.exports = {
    getTeams
}