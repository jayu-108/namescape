const { Client } = require('@elastic/elasticsearch');
const { elasticsearchhost, elasticsearchhost_staging } = require('../../config');

// const elasticsearchhost = process.env.ELASTICSEARCH_HOST

const client = new Client({
    node : elasticsearchhost
})

const client2 = new Client({
  node: elasticsearchhost_staging
})

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"+response))
  .catch(error => console.error("Elasticsearch is not connected."+error))

module.exports = {client, client2};  

