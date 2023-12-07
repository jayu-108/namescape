require('dotenv').config();

module.exports = {
    node_port: process.env.PORT,
    elasticsearchhost: process.env.ELASTICSEARCH_HOST,
    index_name: process.env.INDEX_NAME,
    index_address: process.env.INDEX_ADDRESS
};