const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const { default: axios } = require('axios');
const { upperCase } = require('upper-case');



app.get('/merge-market', (req, res) => {
  let data = [];
  const sboURL = axios.get('https://artemis-exam.secure-restapi.com/sbo');
  const brURL = axios.get('https://artemis-exam.secure-restapi.com/br');

  axios.all([sboURL, brURL]).then(axios.spread((...responses) => {
    const sbo = responses[0]
    const br = responses[1]
    // console.log(sbo.data);
    // console.log('----------------------------------------------------------------------------------------------------------------');
    // console.log(br.data);

    const matchesSBO = [];
    const matchesBR = [];

    for (let i = 0; i < sbo.data.length; i++) {
      for (let j = 0; j < br.data.length; j++) {
        if (upperCase(sbo.data[i].leagueName.en) == upperCase(br.data[j].leagueName.en)) {


          for (let o = 0; o < br.data[j].matches.length; o++) {
            const mkBR = {
              matchId: br.data[j].matches[o].matchId,
              teams: br.data[j].matches[o].teams,
              stat: br.data[j].matches[o].stat,
            };

            matchesBR.push(mkBR);

          }

          const final = {
            leagueId: br.data[j].leagueId,
            leagueName: br.data[j].leagueName,
            matches: matchesBR
          };
          data.push(final);

        }
      }
    }

    res.json(data);
    console.log(data);

  })).catch(errors => {
    // react on errors.
  })



})



app.listen(PORT, () => console.log(`Server is running on ${PORT}`));