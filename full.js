const axios = require('axios');
const {JOJU_LEAGUE, token} = require('./constants');

const config = { headers: { Authorization: `Bearer ${token}`}};

// GET LEAGUE
axios.get(`https://api-fantasy.llt-services.com/api/v3/leagues/${JOJU_LEAGUE}`, config)
  .then(response => {
    if (response.status === 200){
        league = response.data
    }
    else{
        console.log(`1 - The request's resolution isnt correctly. Status code: ${response.status}`)
    }
  })
  .catch(error => {
    console.error(error);
  })
  .then(() => myTeam = league.team);

  // teams.find((player) => player["id"] == myTeam.id)
// GET TEAMS
axios.get(`https://api-fantasy.llt-services.com/api/v3/leagues/${JOJU_LEAGUE}/teams`, config)
  .then(response => {
    if (response.status === 200){
        teams = response.data
    }
    else{
        console.log(`2 - The request's resolution isnt correctly. Status code: ${response.status}`)
    }
  })
  .catch(error => {
    console.error(error);
  })
  .then(() => {
    teams.forEach((team) => {
      team["players"].sort((a, b) => {
        if (a["playerMaster"]["positionId"] < b["playerMaster"]["positionId"]){
          return -1;
        }
        else if (a["playerMaster"]["positionId"] > b["playerMaster"]["positionId"]){
          return 1;
        }
        else {
          return 0;
        }
      });
      team["players"].forEach((p) => {
        if (p["playerMaster"]["positionId"] === 1){
          p["playerMaster"].positionDescription = "POR";
        }
        else if (p["playerMaster"]["positionId"] === 2){
          p["playerMaster"].positionDescription = "DEF";
        }
        else if (p["playerMaster"]["positionId"] === 3){
          p["playerMaster"].positionDescription = "CEN";
        }
        else {
          p["playerMaster"].positionDescription = "DEL";
        }
  
        let formatDate = new Date(p["buyoutClauseLockedEndTime"]);
        let actualDate = new Date();
        if (formatDate > actualDate){
          p.clauseBlocked = "SI";
        }
        else {
          p.clauseBlocked = "NO";
        }
      });
    });
  })
  .then(() => {
    var del = "\t|\t";
    for (let user of teams){
      console.log(user["manager"]["managerName"]);
      for (let player of user.players){
      console.log(player["playerMaster"]["positionDescription"] + del + player["playerMaster"]["nickname"] + del + "Points: " + player["playerMaster"]["points"] + del +
                  "Status: " + player["playerMaster"]["playerStatus"] + del + " Bloqueo: "+ player["clauseBlocked"] + del + player["buyoutClauseLockedEndTime"] 
      );
      }
      console.log("------------------------");
    }
  });

// GET STATUS FROM MY TEAM
axios.get(`https://api-fantasy.llt-services.com/api/v3/leagues/${JOJU_LEAGUE}/teams`, config)
  .then(response => {
    if (response.status === 200){
        teams = response.data
    }
    else{
        console.log(`2 - The request's resolution isnt correctly. Status code: ${response.status}`)
    }
  })
  .catch(error => {
    console.error(error);
  });
/*
var del = "\t|\t";
    for (let player of team.players){
      console.log(player["playerMaster"]["positionDescription"] + del + player["playerMaster"]["nickname"] + del + "Points: " + player["playerMaster"]["points"] + del +
                  "Status: " + player["playerMaster"]["playerStatus"] + del + " Bloqueo: "+ player["clauseBlocked"] + del + player["buyoutClauseLockedEndTime"] + "\n" +
                  "Tendencia: "
      );
    }
*/
