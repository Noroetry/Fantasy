function getSortedPlayers(players, sort){
    switch (sort){
        case 'tend': return players.sort((a, b) => a.tendence - b.tendence).reverse();
        case 'pos': return players.sort((a, b) => a.playerMaster.positionId - b.playerMaster.positionId);
        case 'pts': return players.sort((a, b) => a.playerMaster.points - b.playerMaster.points).reverse();
        case 'avg': return players.sort((a, b) => a.playerMaster.averagePoints - b.playerMaster.averagePoints).reverse();
        case 'market': return players.sort((a, b) => a.playerMaster.salePrice - b.playerMaster.salePrice).reverse();
    }
}

async function showInfoMarket(market, sort = 'pos'){
    console.log("-".repeat(140));
    console.log('POS'.padEnd(3), '|', 'NAME'.padEnd(20), '|', 'PTS'.padEnd(3), '|', 'AVG'.padEnd(6), '|', 
                'SALE PRICE'.padEnd(12), '|', 'TENDENCE'.padEnd(10), '|', 'STATUS'.padEnd(10),
                );
    console.log("-".repeat(140)); 
    market = getSortedPlayers(market, sort);
    for await (player of market){
        let pm = player.playerMaster;
        console.log(player.positionText.toString().padEnd(3), '|', pm.nickname.padEnd(20), '|', pm.points.toString().padStart(3), '|', 
                pm.averagePoints.toFixed(2).toString().padStart(6), '|', pm.marketValue.toLocaleString().padStart(12), '|', 
                player.tendence.toLocaleString().padStart(10), '|', pm.playerStatus.toLocaleString().padStart(8));
    }
    console.log("-".repeat(140));
}

module.exports = {
    showInfoMarket
}