const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node : 'http://10.208.36.141:9200'
})

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected."))

module.exports = client;  

