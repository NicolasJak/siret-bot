// index.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const discoverSIRET = require('./discoverSIRET.js');

const app = express();
//1st console.log();
console.log('Connexion a app');

app.use(bodyParser.json());

// Recast will send a post request to /errors to notify important errors
// described in a json body
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200);
});

// index.js
app.post('/discover-siret', (req, res) => {
 console.log('[POST] /discover-siret');
  const memory = req.body.conversation.memory;
  var numero_siret = memory.codesiret.value;
  //numero_siret = numero_siret.replace(/\s+/g, '');
  console.log(memory.codesiret.value);
  numero_siret = numero_siret.split(' ').join('');
  console.log(numero_siret);
  //const NUMSIRET = memory.codesiret.value;
  const NUMSIRET = numero_siret;
  console.log(NUMSIRET)

  return discoverSIRET(NUMSIRET)
      .then((carouselle) => res.json({
       replies: carouselle,
     }))
      .catch((err) => console.error('SIRETApi::discoverSIRET error: ', err));
   });



   app.listen(config.PORT, () => console.log(`Application lancée sur le port ${config.PORT}`));
