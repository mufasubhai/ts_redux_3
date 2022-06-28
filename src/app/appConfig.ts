
export default {
  env: process.env.NODE_ENV,
  mode: process.env.MODE,
  endpoint: process.env.ENDPOINT,
  key: process.env.KEY,
  pgHost: process.env.PG_HOST,
  pgUser: process.env.PG_USER,
  pgPW: process.env.PG_PW,
  pgDB: process.env.PG_DB,
  pgPort: process.env.PG_PORT,
  cassandraUN: process.env.CASS_USERNAME,
  cassandraPW: process.env.CASS_PW,
  cassandraLocalDataCenter:  "West US",
  cassandraContactPoint:  process.env.CASS_CONTACT_POINT,
  cassandraKeyspace:  process.env.CASS_KEYSPACE,
}
