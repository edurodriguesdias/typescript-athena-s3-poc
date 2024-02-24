const APP_ENV = process.env
setTestEnvs()

import config from "../../src/config";
import { configDotenv } from "dotenv";

jest.mock('dotenv', () => ({
    configDotenv: jest.fn()
}));

function setTestEnvs() {
    process.env.TABLE = 'foo-bar'
    process.env.DATABASE = 'foo-bar'
    process.env.CATALOG = 'foo-bar'    
}

afterEach(() => {
    jest.clearAllMocks()
    process.env = { ...APP_ENV }
    delete process.env.TABLE
    delete process.env.DATABASE
    delete process.env.CATALOG
})

describe('config', () => {

    it('should load environment variables using dotenv', () => {
        expect(configDotenv).toHaveBeenCalled();
    });

    it('validate config object', () => {
        expect(config).toEqual(
            expect.objectContaining({
                aws: {
                    region: 'us-east-1'
                },
                vars: {
                    table: 'foo-bar',
                    database: 'foo-bar',
                    catalog: 'foo-bar'
                }                
            })
        )
    })
})