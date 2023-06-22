const { Client } = require('@elastic/elasticsearch');
const { elasticsearchhost } = require('../../config');

// const elasticsearchhost = process.env.ELASTICSEARCH_HOST

const client = new Client({
    node : elasticsearchhost
})

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected."))

module.exports = client;  

