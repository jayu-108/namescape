const { response } = require('express');
const express = require('express');
const router = express.Router();
const cors = require('cors')
const client = require('./elasticsearch/client')
const { index_name, index_address } = require('../config');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors())
app.use(express.json())

const port = 5000;
// const indexname = process.env.INDEX_NAME

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

app.post('/search',
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
        index: index_name,
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
                          vernacular_name: {
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
                          vernacular_name_in_cdac: {
                            query: `"\" ${query} \ "`,
                            boost: 2,
                            operator: "and"
                          }
                        }
                      }
                    ]
                  }
                }
                //,
                // {
                //   bool: {
                //     must: [
                //       {
                //         match: {
                //           state: state
                //         }
                //       }
                //     ]
                //   }
                // }
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
          vernacular_name: arr.vernacular_name
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

//address search api
app.post('/searchaddress',
  [body('queryA').notEmpty()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ success, errors: errors.array() });
    }

    const { queryA } = req.body;

    try {
      const result = await client.search({
        index: index_address,
        body: {
          from: 0,
          size: 50,
          query: {
            bool: {
              should: [
                {
                  match:{
                    vernacular_address:{
                      query: `"\" ${queryA} \ "`
                    }
                  }
                },
                {
                  match:{
                    address:{
                      query: `"\" ${queryA} \ "`
                    }
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
          address: arr.address,
          vernacular_address: arr.vernacular_address
        }
      })
      success = true;
      console.log(datArray, result.hits.total.value)
      res.json({ address: datArray, total: result.hits.total.value, success });
      //  console.log(data);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error")
    }

  }
)



// getResult();

