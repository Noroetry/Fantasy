const moment = require('moment-timezone');
const { getPLayerTendence } = require('./get-player-tendence');

function getClauseInfo(clauseBlock){
    const now = moment();
    const clauseUnblock = moment.tz(clauseBlock.toString(), 'YYYY-MM-DDTHH:mm:ssZ', 'Europe/Madrid'); 
    const diff = clauseUnblock.diff(now);
    const days = moment.duration(diff).days();
    const hours = moment.duration(diff).hours();
    const minutes = moment.duration(diff).minutes();

    return {
        text: days.toString().padStart(2)+'d '+hours.toString().padStart(2)+'h '+minutes.toString().padStart(2)+'m',
        days,
        hours,
        minutes,
        open: ((minutes<=0 && hours<=0 && days<=0)?true:false)
    }
}

function getPositionDef(id){
    switch(id){
        case 1: return 'POR';
        case 2: return 'DEF';
        case 3: return 'CEN';  
        case 4: return 'DEL';
        case 5: return 'ENT';
        default: return '¿?'
    }
}

async function getPlayersInfo(team){
    for (player of team.players){
        try{
            player.tendence = await getPLayerTendence(player.playerMaster);
            player.clause = getClauseInfo(player.buyoutClauseLockedEndTime)
            player.positionText = getPositionDef(player.playerMaster.positionId);
        } 
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    }
return team;
}

module.exports = {
    getPlayersInfo,
    getPositionDef
}