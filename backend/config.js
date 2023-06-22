const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    elasticsearchhost: process.env.ELASTICSEARCH_HOST,
    indexname: process.env.INDEX_NAME
};