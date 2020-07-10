var pptGen = require('./ppt-gen');
const esClient = require('./client');
const { string } = require('yargs');

const searchDoc = async function(indexName, payload){
    return await esClient.search({
        index: indexName,
        body: payload
    });
}

var argv = require('yargs')
    .usage('Usage: $0 -b [dt_ini] -e [dt_end] -i [index_name] -o [out_pptx_name]')
    .example('$0 -b 2020-01-23T14:05:00.000Z -e 2020-01-23T14:50:00.000Z -i jmeter- -o prev_rel_xpto')
    .alias('b', 'begin')
    .nargs('b', 1)
    .describe('b', 'Begin Time')
    .alias('e', 'end')
    .nargs('e', 1)
    .describe('e', 'End Time')
    .alias('i', 'index')
    .nargs('i', 1)
    .describe('i', 'Index Name')
    .alias('o', 'out')
    .nargs('o', 1)
    .describe('o', 'Output Presentation Name')
    .demandOption(['b','e'])
    .help('h')
    .alias('h', 'help')
    .argv;

//////////////////////////////////////////////////////////
//                  Search requests OK                  //
//////////////////////////////////////////////////////////

async function getElasticDataOk(rowCount, beginTime, endTime, indexName){
    const body = {
      size: rowCount,
      sort: [
        {
          Timestamp: {
            order: 'asc',
            unmapped_type: 'string'
          }
        }
      ],
      _source: {
        includes: [ 'Timestamp', 'ResponseTime']
      },
      aggs: {
        datetime_1m: {
          date_histogram: {
            field: 'Timestamp',
            interval: '1m',
            time_zone: 'America/Sao_Paulo',
            min_doc_count: 1
          },
          aggs: {
            p90ResponseTime: {
              percentiles: {
                field: 'ResponseTime',
                percents: [
                  90
                ],
                keyed: false
              }
            }
          }
        }
      },
      query: {
        bool: {
          must: [
            {
              exists: {
                field: 'Timestamp',
              }
            },
            {
              match_phrase: {
                ErrorCount: {
                  query: 0
                }
              }
            },
            {
              range: {
                Timestamp: {
                  format: 'strict_date_optional_time',
                  gte: beginTime,
                  lt: endTime
                }
              }
            }
          ]
        }
      }
    }
    try {
      const resp = await searchDoc(indexName, body);
      return resp;
    } catch (e) {
      return e;
    }
}

///////////////////////////////////////////////////////////
//                  Search requests Err                  //
///////////////////////////////////////////////////////////
async function getElasticDataErr(rowCount, beginTime, endTime, indexName){
    const body = {
      size: rowCount,
      sort: [
        {
          Timestamp: {
            order: 'asc'
          }
        }
      ],
      aggs: {
        datetime_1m: {
          date_histogram: {
            field: 'Timestamp',
            interval: '1m',
            time_zone: 'America/Sao_Paulo',
            min_doc_count: 1
          },
          aggs: {
            respCode: {
              terms: {
                field: 'ResponseCode.keyword',
                size: 10,
                order: {
                  _count: 'desc'
                }
              }
            }
          }
        }
      },
      query: {
        bool: {
          must: [
            {
              range: {
                Timestamp: {
                  format: 'strict_date_optional_time',
                  gte: beginTime,
                  lt: endTime
                }
              }
            }
          ],
          must_not: [
            {
              bool: {
                should: [
                  {
                    match_phrase: {
                      'ResponseCode.keyword': '200'
                    }
                  },
                  {
                    match_phrase: {
                      'ResponseCode.keyword': '202'
                    }
                  },
                  {
                    match_phrase: {
                      'ResponseCode.keyword': '206'
                    }
                  },
                  {
                    match_phrase: {
                      'ResponseCode.keyword': 'Non HTTP response code: org.apache.http.conn.HttpHostConnectException'
                    }
                  },
                  {
                    match_phrase: {
                      'ResponseCode.keyword': '201'
                    }
                  },
                  {
                    match_phrase: {
                      'ResponseCode.keyword': '204'
                    }
                  },
                  {
                    match_phrase: {
                      'ResponseCode.keyword': ''
                    }
                  }
                ],
                minimum_should_match: 1
              }
            }
          ]
          // must_not: [
          //   {
          //     match_phrase: {
          //       ErrorCount: {
          //         query: 0
          //       }
          //     }
          //   },
          //   {
          //     match_phrase: {
          //       'ResponseCode.keyword': ''
          //     }
          //   },
          //   {
          //     match_phrase: {
          //       'ResponseCode.keyword': '202'
          //     }
          //   },
          //   {
          //     match_phrase: {
          //       'ResponseCode.keyword': '201'
          //     }
          //   },
          //   {
          //     match_phrase: {
          //       'ResponseCode.keyword': '200'
          //     }
          //   },
          //   {
          //     match_phrase: {
          //       'ResponseCode.keyword': '206'
          //     }
          //   },
          //   {
          //     match_phrase: {
          //       'ResponseCode': {
          //         query: '\"Non HTTP response code*\"'
          //       }
          //     }
          //   }
          // ]
        }
      }
    }
    try {
      const resp = await searchDoc(indexName, body);
      return resp;
    } catch (e) {
      return e;
    }
}

//////////////////////////////////////////////////////////
//          Search requests OK Per Transaction          //
//////////////////////////////////////////////////////////
async function getElasticDataOkPerTransaction(rowCount, beginTime, endTime, indexName){
    const body = {
      size: rowCount,
      sort: [
        {
          Timestamp: {
            order: 'asc',
            unmapped_type: 'date'
          }
        }
      ],
      _source: {
        includes: [ 'Timestamp', 'ResponseTime']
      },
      aggs: {
        datetime_1m: {
            date_histogram: {
            field: 'Timestamp',
            interval: '1m',
            time_zone: 'America/Sao_Paulo',
            min_doc_count: 1
          },
          aggs: {
            transactName: {
              terms: {
                field: 'SampleLabel.keyword',
                size: 10,
                order: {
                  'avgRespTime': 'desc'
                }
              },
              aggs: {
                avgRespTime: {
                  avg: {
                    field: 'ResponseTime'
                    
                  }
                }
              }
            }
          }
        }
      },
      query: {
        bool: {
          must: [
            {
              exists: {
                field: 'Timestamp'
              }
            },
            {
              match_phrase: {
                ErrorCount: {
                  query: 0
                }
              }
            },
            {
              bool: {
                must_not: {
                  bool: {
                    should :[
                      {
                        match: {
                          'SampleLabel' : 'TC'
                        }
                      }
                    ],
                    minimum_should_match: 1
                  }
                }
              }
            },
            {
              range: {
                Timestamp: {
                  format: 'strict_date_optional_time',
                  gte: beginTime,
                  lt: endTime
                }
              }
            }
          ]
        }
      }
    }
    try {
      const resp = await searchDoc(indexName, body);
      return resp;
    } catch (e) {
      return e;
    }
}


///////////////////////////////////////////////////////////////////////////////
//                               Main Function                               //
///////////////////////////////////////////////////////////////////////////////
async function main() {
  
  var pptName = 'rel_previo'
  var rowCount = 100;
  var beginTime = argv.begin;
  var endTime = argv.end;
  var indexName = 'jmeter-*';
  
  if (argv.out) {
    pptName = argv.out;
  } 
  
  if (argv.index) {
    indexName = argv.index;
  } 

  console.log('pptName, rowCount, beginTime, endTime, indexName: ', pptName, rowCount, beginTime, endTime, indexName, '\n');
 
  /////////////////////
  // Process Data OK //
  /////////////////////
  var vTimestamp = [];
  var vResponseTime = [];
  var vRpm = [];
  
  try{
    var dataOk = await getElasticDataOk(rowCount, beginTime, endTime, indexName);
    console.log(dataOk);
    for (var indexBucket in dataOk.aggregations.datetime_1m.buckets) {
      var bucket = dataOk.aggregations.datetime_1m.buckets[indexBucket];
      var date_format = bucket.key_as_string.
                          replace(/T/, ' ').
                          replace(/\..+/, '').
                          replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}).+([0-9]{2}):([0-9]{2}):([0-9]{2})/,'$3\/$2 $4\:$5');
      vTimestamp.push(date_format);
      vResponseTime.push(bucket.p90ResponseTime.values[0].value);
      vRpm.push(bucket.doc_count);
    }
  } catch (err) {
    console.log(err);
  }
  

  //////////////////////
  // Process Data Err //
  //////////////////////
  var dictErr = {};
  
  try{
    var dataErr = await getElasticDataErr(rowCount, beginTime, endTime, indexName);
    //console.log(dataErr)
    for (var indexBucket in dataErr.aggregations.datetime_1m.buckets) {
      var bucket = dataErr.aggregations.datetime_1m.buckets[indexBucket];
      var date_format = bucket.key_as_string.
                          replace(/T/, ' ').
                          replace(/\..+/, '').
                          replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}).+([0-9]{2}):([0-9]{2}):([0-9]{2})/,
                            '$3\/$2 $4\:$5');
      for (var index_2 in bucket.respCode.buckets) {
        var bucketErr = bucket.respCode.buckets[index_2];
        if (bucketErr.key in dictErr) {
          dictErr[bucketErr.key].push([date_format, bucketErr.doc_count])
        } else {
          dictErr[bucketErr.key] = [[date_format, bucketErr.doc_count]]
        }
      }
    }
  } catch (err) {
    console.log(err);
  }

  /////////////////////////////////////
  // Process Data OK Por Transaction //
  /////////////////////////////////////
  var dictTransact = {};
  
  try{
    var dataTransact = await getElasticDataOkPerTransaction(rowCount, beginTime, endTime, indexName);
    for (var indexBucket in dataTransact.aggregations.datetime_1m.buckets) {
      var bucket = dataTransact.aggregations.datetime_1m.buckets[indexBucket];
      var date_format = bucket.key_as_string.
                    replace(/T/, ' ').
                    replace(/\..+/, '').
                    replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}).+([0-9]{2}):([0-9]{2}):([0-9]{2})/,'$3\/$2 $4\:$5');
      for (var indexTransaction in bucket.transactName.buckets) {
        var bucketTransaction = bucket.transactName.buckets[indexTransaction];
        if (bucketTransaction.key in dictTransact) {
          dictTransact[bucketTransaction.key].push([date_format, 
            bucketTransaction.doc_count, bucketTransaction.avgRespTime.value])
        } else {
          dictTransact[bucketTransaction.key] = [[date_format, 
            bucketTransaction.doc_count, bucketTransaction.avgRespTime.value]]
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  pptGen.createPptx(pptName, vTimestamp, vResponseTime, vRpm, dictErr, dictTransact);
}

main();
