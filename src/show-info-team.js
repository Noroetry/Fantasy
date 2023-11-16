function getSortedPlayers(players, sort){
    switch (sort){
        case 'tend': return players.sort((a, b) => a.tendence - b.tendence).reverse();
        case 'pos': return players.sort((a, b) => a.playerMaster.positionId - b.playerMaster.positionId);
        case 'pts': return players.sort((a, b) => a.playerMaster.points - b.playerMaster.points).reverse();
        case 'avg': return players.sort((a, b) => a.playerMaster.averagePoints - b.playerMaster.averagePoints).reverse();
        case 'market': return players.sort((a, b) => a.playerMaster.marketValue - b.playerMaster.marketValue).reverse();
        case 'clause': return players.sort((a, b) => a.buyoutClause - b.buyoutClause).reverse();
        case 'unblock': return players.sort((a, b) => a.buyoutClauseLockedEndTime - b.buyoutClauseLockedEndTime);
    }
}

async function showInfoTeam(team, sort = 'pos'){
    console.log("-".repeat(140));
    console.log(`Mánager: ${team.manager.managerName}\tTeam Value: $${team.teamValue.toLocaleString()}\t Tendence Global Value: $${team.players.reduce((cont, player) => cont + player.tendence, 0).toLocaleString()}`);
    console.log('POS'.padEnd(3), '|', 'NAME'.padEnd(20), '|', 'PTS'.padEnd(3), '|', 'AVG'.padEnd(6), '|', 
                'MARKET VALUE'.padEnd(12), '|', 'CLAUSE PRIZE'.padEnd(12), '|', 'TENDENCE'.padEnd(10), '|', 
                'CLAUSE UNBLOCK'.padEnd(30)
                );
    console.log("-".repeat(140)); 
    team.players = getSortedPlayers(team.players, sort);
    for await (player of team.players){
        let pm = player.playerMaster;
        console.log(player.positionText.toString().padEnd(3), '|', pm.nickname.padEnd(20), '|', pm.points.toString().padStart(3), '|', 
                pm.averagePoints.toFixed(2).toString().padStart(6), '|', pm.marketValue.toLocaleString().padStart(12), '|', 
                player.buyoutClause.toLocaleString().padStart(12), '|', player.tendence.toLocaleString().padStart(10), '|', ((player.clause.open)?'OPEN'.padStart(8):player.clause.text));
    }
    console.log('\ninfo -> Se puede ordenar las tablas poniendo como último parámetro la columna. (pos, pts, avg, market, clause, tend, unblock)');
    console.log("-".repeat(140));
}

module.exports = {
    showInfoTeam
}