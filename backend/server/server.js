const { response } = require('express');
const express = require('express');
const router = express.Router();
const client = require('./elasticsearch/client');


const app = express();
app.use(express.json())  

const port = 5000;

// const query = 'fulwanti';

// const state = 'maharashtra'

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

app.get('/demo',(req, res) => {
    res.send("Hare Krishna")
})

app.post('/search', async (req, res) => {

    const {query, state} = req.body;

    const result = await client.search({
        index: 'searchwithcdacmulti',
        body: {
          query: {
            // match: { name_cdac: 'pralhad' }
                bool: {
                  must: [
                    {
                      bool: {
                        should: [
                          {          
                                  match: {
                                    name: {
                                      query:  `"\" ${query} \ "`,
                                      boost: 5,
                                      operator: "and"
                                    }
                                  }              
                          },
                          {
                            match: {
                              name_in: {
                                query:  `"\" ${query} \ "`,
                                boost: 3,
                                operator: "and"
                              }
                            }
                          },
                          {
                            match: {
                              name_cdac: {
                                query:  `"\" ${query} \ "`,
                                boost: 2,
                                operator: "and"
                              }
                            }
                          },
                          {
                            match: {
                              name_in_cdac: {
                                query:  `"\" ${query} \ "`,
                                boost: 2,
                                operator: "and"
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      bool: {
                        must: [
                          {
                            match: {
                              state: state
                            }
                          },
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

      res.json({result:result.hits.hits,total:result.hits.total.value});
      console.log(result.hits.hits);
      console.log(result.hits.total.value)
    }
)



// getResult();

