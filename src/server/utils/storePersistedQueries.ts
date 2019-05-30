import getRethink from 'server/database/rethinkDriver'
import * as fs from 'fs'
import queryMap from '../graphql/queryMap.json'

const storePersistedQueries = async () => {
  const hashes = Object.keys(queryMap)
  const records = hashes.map((hash) => ({
    id: hash,
    query: queryMap[hash]
  }))

  const r = getRethink()
  const res = await r.table('QueryMap').insert(records)
  r.getPoolMaster().drain()
  fs.unlinkSync('src/server/graphql/queryMap.json')
  console.log(`Added ${res.inserted} records to the queryMap`)
}

storePersistedQueries().catch()