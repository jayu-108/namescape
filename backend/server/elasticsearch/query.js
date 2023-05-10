async function getResult() {
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
}