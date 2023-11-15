const arg = process.argv[2] ?? '';

const { getLeague } = require('./src/get-league');
const { getTeams } = require('./src/get-teams');
const { getPlayerInfo } = require('./src/get-player-info');
let league = {};
let teams = [];

async function fetchData(){
    try{
        league = await getLeague();
        teams = await getTeams(league.id)
        switch (arg){
            case 'team':{
                let teamIndex = teams.findIndex(t => t.id === league.team.id.toString());
                let players = teams[teamIndex].players;
                console.log('POS'.padEnd(3), '|', 'NAME'.padEnd(30), '|', 'PTS'.padEnd(3), '|', 'AVG'.padEnd(6), '|', 
                            'VALUE'.padEnd(12), '|', 'TENDENCE'.padEnd(12), '|', 'CLAUSE UNBLOCK');
                players.forEach(player => {
                    pm = player.playerMaster
                    console.log(pm.positionId.toString().padEnd(3), '|', pm.nickname.padEnd(30), '|', pm.points.toString().padStart(3), '|', 
                                pm.averagePoints.toFixed(2).toString().padStart(6), '|', pm.marketValue.toString().padStart(12), '|', '+XXX.YYY'.padEnd(12));    
                });
            break;
            }
            case 'others':{
                if (process.argv[3]){
                    let teamIndex = teams.findIndex(t => t.manager.managerName === process.argv[3]);
                    if (teamIndex > -1){
                        let players = teams[teamIndex].players;
                        console.log('POS'.padEnd(3), '|', 'NAME'.padEnd(30), '|', 'PTS'.padEnd(3), '|', 'AVG'.padEnd(6), '|', 
                                    'VALUE'.padEnd(12), '|', 'TENDENCE'.padEnd(12), '|', 'CLAUSE UNBLOCK');
                        players.forEach(player => {
                            pm = player.playerMaster
                            clauseBlock = new Date(player.buyoutClauseLockedEndTime).getTime();
                            dateNow = new Date().getTime();
                            diff = clauseBlock - dateNow;
                            diff = Math.round(diff/(1000*60*60*24));
                            console.log(pm.positionId.toString().padEnd(3), '|', pm.nickname.padEnd(30), '|', pm.points.toString().padStart(3), '|', 
                                        pm.averagePoints.toFixed(2).toString().padStart(6), '|', pm.marketValue.toString().padStart(12), '|', '+XXX.YYY'.padEnd(12), '|',
                                        ((diff==0)?'TODAY':'MORE 1 DAY').padEnd(10));    
                        });
                    }
                }
                else{
                    console.log('Es necesario que como tercer parámetro se pase el nombre del jugador que quieres analizar.');
                    teams.forEach(t => console.log(t.manager.managerName.toString().padStart(30)));
                }
            break;
            }
            case 'market':{
                console.log('Market');
            break;
            }
            default:{
                console.log('El argumento no existe');
                process.exit(1)
            }
        }
    }
    catch (err){
        console.log(err);
    }
}

fetchData();
