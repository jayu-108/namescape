const { response } = require('express');
const express = require('express');
const router = express.Router();
const cors = require('cors')
const client = require('./elasticsearch/client')
const { index_name, index_address, node_port } = require('../config');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors())
app.use(express.json())

console.log(index_name);
console.log(index_address);

app.listen(node_port, () => console.log(`Server listening at http://localhost:${node_port}`));

app.post('/search',
  [body('query').notEmpty()
  // ,
  // body('state').notEmpty()
],
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
            // bool: {
            //   must: [
            //     {
            bool: {
              should: [
                {
                  match: {
                    name: {
                      query: `"\" ${query} \ "`,
                      // boost: 5,
                      operator: "and"
                    }
                  }
                },
                {
                  match: {
                    vernacular_name: {
                      query: `"\" ${query} \ "`,
                      // boost: 3,
                      operator: "and"
                    }
                  }
                },
                {
                  match: {
                    name_cdac: {
                      query: `"\" ${query} \ "`,
                      // boost: 2,
                      operator: "and"
                    }
                  }
                },
                {
                  match: {
                    vernacular_name_in_cdac: {
                      query: `"\" ${query} \ "`,
                      // boost: 2,
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
          //     ]
          //   }
          // }
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

    let { queryA } = req.body;

    const enQuery = encodeURIComponent(queryA);

    console.log(enQuery)
    console.log("original "+ queryA)

    try {
      const result = await client.search({
        index: index_address,
        //multimatch query
        // body: {
        //   from: 0,
        //   size: 600,
        //   query: {
        //     multi_match: {
        //       query: `"\" ${enQuery} \ "`,
        //       fields: ["address^3", "vernacular_address^2", "address_cdac^1", "vernacular_address_cdac^1"],
        //       type: 'most_fields',
        //       operator: "OR"
        //     }
        //   }
        // }

        //bool query
        // body: {
        //   from: 0,
        //   size: 600,
        //   query: {
        //     bool: {
        //       should: [
        //         {
        //           match:{
        //             address:{
        //               query: `"\" ${enQuery} \ "`
        //             }
        //           }
        //         },
        //         {
        //           match:{
        //             vernacular_address:{
        //               query: `"\" ${enQuery} \ "`
        //             }
        //           }
        //         },
        //         {
        //           match:{
        //             address_cdac:{
        //               query: `"\" ${enQuery} \ "`
        //             }
        //           }
        //         },
        //         {
        //           match:{
        //             vernacular_address_cdac:{
        //               query: `"\" ${enQuery} \ "`
        //             }
        //           }
        //         }
        //       ]
        //     }
        //   }
        // }

        //more like this query
        // body: {

        //   query: {
        //     more_like_this: {
        //       fields: ["address", "vernacular_address", "address_cdac", "vernacular_address_cdac"],
        //       like: `"\" ${enQuery} \ "`,
        //       min_term_freq: 1,
        //       max_query_terms: 12
        //     }
        //   }

        // }

        body: {
          from:0,
          size:600,
          query: {
            bool: {
              must: [
                {
                  multi_match:{
                    query: `"\" ${queryA} \ "`,
                    fields: ["address", "vernacular_address"],
                    type: 'phrase'
                  }
                }
              ],
              should: [
                {
                  match: {
                    "address": `"\" ${queryA} \ "`
                  }
                },
                {
                  match: {
                    "address_cdac": `"\" ${queryA} \ "`
                  }
                },
                {
                  match: {
                    "vernacular_address": `"\" ${queryA} \ "`
                  }
                },
                {
                  match: {
                    "vernacular_address_cdac": `"\" ${queryA} \ "`
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

