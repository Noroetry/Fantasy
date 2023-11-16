const axios = require('axios');
const {token} = require('../lib/constants');
const config = { headers: { Authorization: `Bearer ${token}`}};

async function getPLayerTendence(player){
    let res;
    try {
        res = await axios.get(`https://api-fantasy.llt-services.com/api/v3/player/${player.id}/market-value`, config)

        if (res.status === 200){
            return (res.data[res.data.length - 1].marketValue - res.data[res.data.length - 2].marketValue);
        }
        return JSON.stringify({error: `${res.status} - ${res.statusText}`});
    }
    catch (err) {
        return JSON.stringify({error: `${err.response.status} - ${err.response.statusText}`});
    }
}

module.exports = {
    getPLayerTendence
}