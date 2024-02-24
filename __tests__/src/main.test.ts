process.env.TABLE = 'foo-bar'
process.env.DATABASE = 'foo-bar'
process.env.CATALOG = 'foo-bar'

import config from "../../src/config";

jest.mock("../../src/config");
jest.mock("../../src/AthenaClient/AthenaQueryClient")
jest.mock("dotenv")

afterEach(() => {
    jest.clearAllMocks()

    delete process.env.TABLE
    delete process.env.DATABASE
    delete process.env.CATALOG
})

const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

describe("main", () => {
    it("should create AthenaQueryClient instance with correct parameters", async () => {
        (global as any).handle = jest.fn();

        await import("../../src/main");

        expect(config.vars.table).toBe('foo-bar');
        expect(config.vars.database).toBe('foo-bar');
        expect(config.vars.catalog).toBe('foo-bar');
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    });
});