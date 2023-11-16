const { getPositionDef } = require('./get-player-info');
const { getPLayerTendence } = require('./get-player-tendence');

async function getMarketPlayerInfo(market){
    for (player of market){
        try{
            player.tendence = await getPLayerTendence(player.playerMaster);
            player.positionText = getPositionDef(player.playerMaster.positionId);
        } 
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    }
return market;
}

module.exports = {
    getMarketPlayerInfo
}