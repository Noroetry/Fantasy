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
        default: return '¿?'
    }
}

function getSortedPlayers(players, sort){
    switch (sort){
        case 'pos': return players.sort((a, b) => a.playerMaster.positionId - b.playerMaster.positionId);
        case 'pts': return players.sort((a, b) => a.playerMaster.points - b.playerMaster.points).reverse();
        case 'avg': return players.sort((a, b) => a.playerMaster.averagePoints - b.playerMaster.averagePoints).reverse();
        case 'market': return players.sort((a, b) => a.playerMaster.marketValue - b.playerMaster.marketValue).reverse();
        case 'clause': return players.sort((a, b) => a.buyoutClause - b.buyoutClause).reverse();
        case 'unblock': return players.sort((a, b) => a.buyoutClauseLockedEndTime - b.buyoutClauseLockedEndTime);
    }
}

async function getPlayerInfo(player){
    pm = player.playerMaster
    let clause, positionText;
    let tendence;
    try{
        tendence = await getPLayerTendence(pm);
        clause = getClauseInfo(player.buyoutClauseLockedEndTime)
        positionText = getPositionDef(pm.positionId);
        
        console.log(positionText.toString().padEnd(3), '|', pm.nickname.padEnd(20), '|', pm.points.toString().padStart(3), '|', 
                pm.averagePoints.toFixed(2).toString().padStart(6), '|', pm.marketValue.toLocaleString().padStart(12), '|', 
                player.buyoutClause.toLocaleString().padStart(12), '|', tendence.toLocaleString().padStart(10), '|', ((clause.open)?'OPEN'.padStart(8):clause.text));
    } 
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

async function showInfoTeam(teams, teamIndex, sort = 'pos'){
    let players;
    if (teamIndex > -1){
        players = teams[teamIndex].players;
        console.log("-".repeat(140));
        console.log(`Mánager: ${teams[teamIndex].manager.managerName}\n`);
        console.log('POS'.padEnd(3), '|', 'NAME'.padEnd(20), '|', 'PTS'.padEnd(3), '|', 'AVG'.padEnd(6), '|', 
                    'MARKET VALUE'.padEnd(12), '|', 'CLAUSE PRIZE'.padEnd(12), '|', 'TENDENCE'.padEnd(10), '|', 
                    'CLAUSE UNBLOCK'.padEnd(30)
                    );
        console.log("-".repeat(140));
        players = getSortedPlayers(players, sort)

        for (player of players){
            await getPlayerInfo(player);
        };
        console.log('\ninfo -> Se puede ordenar las tablas poniendo como último parámetro la columna. (pos, pts, avg, market, clause, clause, unblock)')
    }
}

module.exports = {
    showInfoTeam
}