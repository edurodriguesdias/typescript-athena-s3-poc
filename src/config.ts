import { configDotenv } from "dotenv";

export const config = {
    'aws': {
        'region': 'us-east-1'
    },
    'vars': {
        'table': process.env.TABLE,
        'database': process.env.DATABASE,
        'catalog': process.env.CATALOG    
    }
}

configDotenv()