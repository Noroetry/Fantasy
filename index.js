const { getLeague } = require('./src/get-league');
const { getTeams } = require('./src/get-teams');
const { showInfoTeam } = require('./src/show-info-team');
let league = {};
let teams = [];

async function fetchData(){
    try{
        league = await getLeague();
        teams = await getTeams(league.id)
        switch (process.argv[2]){
            case 'team':{
                let teamIndex = teams.findIndex(t => t.id === league.team.id.toString());
                if (process.argv[3]) showInfoTeam(teams, teamIndex, process.argv[3]);
                else showInfoTeam(teams, teamIndex);
            break;
            }
            case 'others':{
                if (process.argv[3]){
                    if (process.argv[3] === 'all'){
                        let index = 0
                        for (t of teams) {
                            if (process.argv[4]) {
                                await showInfoTeam(teams, index++, process.argv[4]);
                            }
                            else {
                                await showInfoTeam(teams, index++);
                            }
                        }
                        return;
                    }
                    let teamIndex = teams.findIndex(t => t.manager.managerName === process.argv[3]);
                    if (process.argv[4]){
                        showInfoTeam(teams, teamIndex, process.argv[4]);  
                    } 
                    else {
                        showInfoTeam(teams, teamIndex);
                    }
                }
                else{
                    console.log('Es necesario que como tercer parámetro se pase el nombre del jugador que quieres analizar o bien usa "all".\nUSERS:');
                    teams.forEach(t => console.log(t.manager.managerName));
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
