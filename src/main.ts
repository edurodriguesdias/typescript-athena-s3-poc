import AthenaQueryClient from "./AthenaClient/AthenaQueryClient.js";
import config  from "./config.js";
import { fromEnv } from "@aws-sdk/credential-providers";

async function handle() {
    let table = config.vars.table
    let database = config.vars.database
    
    const athenaQueryClient = new AthenaQueryClient({
        ClientConfig: {
            region: config.aws.region,
            credentials: fromEnv() 
        },
        Database: config.vars.database,
        Catalog: config.vars.catalog
    });
    
    const query = await athenaQueryClient.search(`SELECT * FROM ${database}.${table} LIMIT 10`)
    
    console.log('Query Result: ', query)
}

handle()