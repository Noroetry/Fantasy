const axios = require('axios');
const {token} = require('../lib/constants');
const config = { headers: { Authorization: `Bearer ${token}`}};

async function getLeague(){
    let res;
    try {
        res = await axios.get('https://api-fantasy.llt-services.com/api/v3/leagues', config)

        if (res.status === 200){ 
            return res.data[0];
        }
        return JSON.stringify({error: `${res.status} - ${res.statusText}`});
    }
    catch (err) {
        return JSON.stringify({error: `${err.response.status} - ${err.response.statusText}`});
    }
}

module.exports = {
    getLeague
}