import { configDotenv } from "dotenv";

export default {
    aws: {
        region: 'us-east-1'
    },
    vars: {
        table: process.env.TABLE,
        database: process.env.DATABASE,
        catalog: process.env.CATALOG    
    }
}

configDotenv()