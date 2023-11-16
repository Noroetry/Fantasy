const axios = require('axios');
const {token} = require('../lib/constants');
const config = { headers: { Authorization: `Bearer ${token}`}};

async function getMarket(idLeague){
    let res;
    try {
        res = await axios.get(`https://api-fantasy.llt-services.com/api/v3/league/${idLeague}/market`, config)

        if (res.status === 200){
            market = res.data.filter(player => player.discr === 'marketPlayerLeague');
            return market;
        }
        return JSON.stringify({error: `${res.status} - ${res.statusText}`});
    }
    catch (err) {
        return JSON.stringify({error: `${err.response.status} - ${err.response.statusText}`});
    }
}

module.exports = {
    getMarket
}