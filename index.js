const axios = require('axios');

const JOJU_LEAGUE = '012700009';
var myTeam, league = {}
var teams = []

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkNBdXdPcWRMN2YyXzlhTVhZX3ZkbEcyVENXbVV4aklXV1MwNVB4WHljcUkiLCJ0eXAiOiJKV1QifQ.eyJlbWFpbCI6ImxvcmVuem8ubWFydGluZXoucGFibG9AZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IlBhYmxvIiwiZmFtaWx5X25hbWUiOiJMb3JlbnpvIE1hcnTDrW5leiIsIm5hbWUiOiJHb29nbGUgdXNlciIsImlkcCI6Imdvb2dsZS5jb20iLCJzdWIiOiI2OWZlNGQxZi02M2MwLTQ2MWMtYWY3Ni0yMjhlMjUwYTZkNzUiLCJleHRlbnNpb25fRW1haWxWZXJpZmllZCI6dHJ1ZSwiZXh0ZW5zaW9uX1VzZXJQcm9maWxlSWQiOiI1ZTNlM2FlMy1jMmZjLTQyMmItYmZlZS1hMmEyMGMyZjFjYzEiLCJvaWQiOiI1ZTNlM2FlMy1jMmZjLTQyMmItYmZlZS1hMmEyMGMyZjFjYzEiLCJhenAiOiJmZWM5ZTNmZC04Zjg4LTQ1YWItOGNiZC1iNzBiOWQ2NWRkZTAiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2OTk3MDMwNzksImF1ZCI6ImZlYzllM2ZkLThmODgtNDVhYi04Y2JkLWI3MGI5ZDY1ZGRlMCIsImV4cCI6MTY5OTc4OTQ3OSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5sYWxpZ2EuZXMvMzM1MzE2ZWItZjYwNi00MzYxLWJiODYtMzVhN2VkY2RjZWMxL3YyLjAvIiwibmJmIjoxNjk5NzAzMDc5fQ.OeLsr8VEUBU2hsUwFp4iGlxc4mSWsBVi8FkAGlOnf4bNUI5NVU3Hhbz2qugBrnZ067lXzXTGMl4Ldjr04lMKFIikdRjEScPT3uRm8MoNcBCYrS0AnVB-WnF_tnbNogg76-AomBXP4PaB0JFuO-j8Q0Y3Vr9P6Xi_qL50F4-SvtvFaT5kNvtDdNY1-ConSMtCNjVkMGgSMlnZUtY0RkLHUnPJUv0KEcNCxiS49iaPm-5iwVu_Uc3-H6_DZJLYZ67uMmJk9XGEhFf3PymnSdbyptPBFCmG5JxAWAMKAOaDNq_g_rHd9PkaO03ovm5j6em49AS2LxTDr6m0DMNnCDzJHg';
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
