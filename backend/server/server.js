const { response } = require('express');
const express = require('express');
const cors = require('cors')
const { index_name, index_address, node_port } = require('../config');

const app = express();
app.use(cors())
app.use(express.json())

console.log(index_name);
console.log(index_address);

app.use('/name', require('./routes/name'));
app.use('/address', require('./routes/address'));

app.listen(node_port, () => console.log(`Server listening at http://localhost:${node_port}`));


