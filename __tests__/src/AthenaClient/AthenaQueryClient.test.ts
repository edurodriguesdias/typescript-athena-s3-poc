import AthenaQueryClient from "../../../src/AthenaClient/AthenaQueryClient";
import { AthenaQueryClientConfigInterface } from "../../../src/AthenaClient/AthenaQueryClientConfigInterface";
import { 
    AthenaClient, 
    GetQueryExecutionCommand,   
    StartQueryExecutionCommand 
} from "@aws-sdk/client-athena";

jest.mock("@aws-sdk/client-athena", () => {
    return {
      AthenaClient: jest.fn().mockImplementation(() => ({
        send: jest.fn().mockImplementation((command) => {
            if (command instanceof StartQueryExecutionCommand) {
                return { QueryExecutionId: "3db3a7d9-2b6f-49f0-b66f-6c91956340a6" }
            }

            if (command instanceof GetQueryExecutionCommand) {
                return {
                    QueryExecution: {
                      Status: {
                        State: "SUCCEEDED"
                      }
                    }
                };
            }

            return {}
          })
      })),
      StartQueryExecutionCommand: jest.fn().mockImplementation(() => ({
        
      })),
      GetQueryExecutionCommand: jest.fn().mockImplementation(() => {
        
      }),
      QueryExecutionState: jest.fn().mockImplementation(() => {
        
      })
    };
});

const MockedAthenaQueryConfig: AthenaQueryClientConfigInterface = {
    ClientConfig: jest.fn(),
    Database: "foo",
    Catalog: "bar",
    WorkGroup: null
}

describe("testing athena query instance", () => {
    it("instance athena query", () => {

        const queryInstance = new AthenaQueryClient(MockedAthenaQueryConfig)

        expect(queryInstance.database).toBe("foo")
        expect(queryInstance.catalog).toBe("bar")
        expect(queryInstance.workgroup).toBe("primary")
        expect(queryInstance.database).toBe("foo")

        expect(AthenaClient).toHaveBeenCalledWith(MockedAthenaQueryConfig.ClientConfig)
    });

    it("testing search method", async () => {
        const queryStatement = "SELECT * FROM foo"
        const queryInstance = new AthenaQueryClient(MockedAthenaQueryConfig)

        await queryInstance.search(queryStatement)

        const queryInput = {
            QueryString: queryStatement,
            QueryExecutionContext: {
                Database: queryInstance.database,
                Catalog: queryInstance.catalog
            },
            WorkGroup: queryInstance.workgroup
        }

        expect(StartQueryExecutionCommand).toHaveBeenCalledWith(queryInput)
        expect(AthenaClient).toHaveBeenCalledWith(MockedAthenaQueryConfig.ClientConfig)
    })
});