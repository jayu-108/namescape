const express = require('express');
const router = express.Router();
const {client2, client} = require('../elasticsearch/client')
const { index_all_state } = require('../../config');
const { body, validationResult } = require('express-validator');

const app = express()

router.post('/namescape',
    [body('query').notEmpty(),
    body('state').notEmpty()],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ success, errors: errors.array() });
        }

        const { query, state } = req.body;

        try {
            const result = await client.search({
                index: index_all_state,
                body: {
                    from: 0,
                    size: 50,
                    query: {
                        bool: {
                            must: [
                                {
                                    bool: {
                                        should: [
                                            {
                                                match: {
                                                    name: {
                                                        query: `"\" ${query} \ "`,
                                                        boost: 5,
                                                        operator: "and"
                                                    }
                                                }
                                            },
                                            {
                                                match: {
                                                    name_in: {
                                                        query: `"\" ${query} \ "`,
                                                        boost: 3,
                                                        operator: "and"
                                                    }
                                                }
                                            },
                                            {
                                                match: {
                                                    name_cdac: {
                                                        query: `"\" ${query} \ "`,
                                                        boost: 2,
                                                        operator: "and"
                                                    }
                                                }
                                            },
                                            {
                                                match: {
                                                    name_in_cdac: {
                                                        query: `"\" ${query} \ "`,
                                                        boost: 2,
                                                        operator: "and"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                                ,
                                {
                                    bool: {
                                        must: [
                                            {
                                                match: {
                                                    state: state
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            })
            const data = await result.hits.hits;
            const datArray = data.map((element) => {
                const arr = element._source;
                return {
                    name: arr.name,
                    name_in: arr.name_in
                }
            })
            success = true;
            console.log(datArray, result.hits.total.value)
            res.json({ name: datArray, total: result.hits.total.value, success });
            //  console.log(data);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }

    }
)

module.exports = router;