const es = require('elasticsearch');
const esClient = new es.Client({
    host:'http://127.0.0.1:9200'
   
  });

//const esClient = new es.Client({
  //   host: 'localhost:50200',

    // log: 'trace'
// });

//testar conexão com o elasticsearch
 esClient.ping({
   requestTimeout: 30000,
   }, function (error) {
     if (error) {
       console.error('elasticsearch cluster is down!');
     } else {
       console.log('All is well');
     }
   });

module.exports = esClient;