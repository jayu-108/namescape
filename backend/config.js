require('dotenv').config();

module.exports = {
    node_port: process.env.PORT,
    elasticsearchhost: process.env.ELASTICSEARCH_HOST,
    elasticsearchhost_staging: process.env.ELASTICSEARCH_HOST_STAGING,
    index_name: process.env.INDEX_NAME,
    index_address: process.env.INDEX_ADDRESS,
    index_all_state: process.env.INDEX_ALL_STATE
};