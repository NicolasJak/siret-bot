// discoverSIRET.js

const axios = require('axios');
const config = require('./config.js');

function discoverSIRET(NUMSIRET) {
  // return axios.get(`https://api.insee.fr/entreprises/sirene/V3/siret/19340011600011`, {
return axios.get(`https://api.insee.fr/entreprises/sirene/V3/siret/${NUMSIRET}`, {
     headers: {
       'Accept': 'application/json',
       'Authorization': config.SIRETDB_TOKEN,
     },
   })

   .then(response => {
          // console.log(response.data);
          results = response.header;
          console.log(response.data.header.statut);
          console.log(response.data.etablissement.uniteLegale.denominationUniteLegale);
          // variabilisation des données renvoyées par l'API
          uniteLegale = response.data.etablissement.uniteLegale;
          adresseetab = response.data.etablissement.adresseEtablissement

          var denomination2 = uniteLegale.denominationUniteLegale;

          var lib1 = 'La dénomination de l\'unité légale associée au SIRET est :';
          var lib_denomination = [lib1, denomination2].join(" ");
          var activite = uniteLegale.activitePrincipaleUniteLegale;
          var categorie = uniteLegale.categorieEntreprise;
          var effectif = uniteLegale.trancheEffectifsEtablissement;
          var donnesetablissement = [activite, categorie, effectif].join(" ");
          var tyvoie = adresseetab.typeVoieEtablissement;
          var voie = adresseetab.libelleVoieEtablissement;
          var rue = [tyvoie, voie].join(" ");
          var codepostal = adresseetab.codePostalEtablissement;
          var commune = adresseetab.libelleCommuneEtablissement;
          var ville = [codepostal, commune].join(" ");
          var imageSSG;
          var SSG = 'SOPRA';

  imageSSG = (denomination2.includes(SSG)) ? true : false;
  console.log(imageSSG)

      if (response.data.header.statut === 400) {
       return [
      //type: 'quickReplies',
      { type: 'text', content: "Désolé, mais le code SIRET indiqué ne renvoie aucun résultat. Veuillez recommmencer.",},
        //content: {
        //   title: 'Désolé, mais le code SIRET indiqué ne renvoie aucun résultat :(',
        //    buttons: [{ title: 'Recommençons', value: 'Recommençons' }],
       ];
     }

else if (imageSSG === true) {
      return [

  { type: 'text', content: "Voici les résultats de ma recherche :", },
        {
    type: 'list',
    content: {
      elements: [
        {
          title: "Dénomination",
          subtitle: denomination2,
          buttons: [
            {
              title: "Données de l\' etablissement",
              type: "BUTTON_TYPE",
              value: donnesetablissement
            }
          ]
        },
        {
          title: "Adresse",
          subtitle: ville,
          buttons: [
            {
              title: "Données d\' adresse",
              type: "BUTTON_TYPE",
              value: rue
            }
          ]
        },
//         {
//           title: "Activité - Catégorie - Effectif",
//           subtitle: donnesetablissement,
//         }
      ],
     // buttons: [
     //   {
     //     title: "BUTTON_2_TITLE",
     //     type: "BUTTON_TYPE",
     //     value: "BUTTON_2_VALUE"
     //   }
     // ]
    }
  },

  {type: 'picture', content: "https://pbs.twimg.com/profile_images/552001875608756225/cdUmGI1e_400x400.jpeg",},
        ];
  }

  else {
        return [
  //        { type: 'text', content: lib_denomination, },
  //        { type: 'text', content: denomination2, },
  //        { type: 'text', content: donnesetablissement, },
  //        { type: 'text', content: rue, },
    { type: 'text', content: "Voici les résultats de ma recherche :", },
          {
      type: 'list',
      content: {
        elements: [
          {
            title: "Dénomination",
            subtitle: denomination2,
            buttons: [
              {
                title: "Données de l\' etablissement",
                type: "BUTTON_TYPE",
                value: donnesetablissement
              }
            ]
          },
          {
            title: "Adresse",
            subtitle: ville,
            buttons: [
              {
                title: "Données d\' adresse",
                type: "BUTTON_TYPE",
                value: rue
              }
            ]
          },
  //         {
  //           title: "Activité - Catégorie - Effectif",
  //           subtitle: donnesetablissement,
  //         }
        ],
       // buttons: [
       //   {
       //     title: "BUTTON_2_TITLE",
       //     type: "BUTTON_TYPE",
       //     value: "BUTTON_2_VALUE"
       //   }
       // ]
      }
    },

//    {type: 'picture', content: "https://pbs.twimg.com/profile_images/552001875608756225/cdUmGI1e_400x400.jpeg",},
          ];
    }

    })}

   module.exports = discoverSIRET;
