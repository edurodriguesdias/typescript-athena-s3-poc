import { AthenaQueryClient } from "./AthenaClient/AthenaQueryClient.js";
import { config } from "./config.js";

let table = config.vars.table
let database = config.vars.database

const athenaQueryClient = new AthenaQueryClient({
    ClientConfig: { region: 'us-east-1' },
    Database: config.vars.database,
    Catalog: config.vars.catalog
});

const query = await athenaQueryClient.search(`SELECT * FROM ${database}.${table} LIMIT 10`)

console.log(query);
