const { response } = require('express');
const express = require('express');
const router = express.Router();
const cors = require('cors')
const client = require('./elasticsearch/client');


const app = express();
app.use(cors())
app.use(express.json())

const port = 5000;

let success = false;
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

app.post('/search', async (req, res) => {

  const { query, state } = req.body;

  if (query !== '' && state !== '') {

    const result = await client.search({
      index: 'searchwithcdacanalyzer2',
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
              },
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
  }
  else {
    if (query == null) {
      res.json({ message: "Please Enter A Query !", success })
      console.log("Null Query");
    } else {
      res.json({ message: "Please Select State !", success})
      console.log("Null State");
    }
  }

}
)



// getResult();

