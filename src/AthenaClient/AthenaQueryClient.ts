import { 
    AthenaClient, 
    GetQueryExecutionCommand, 
    GetQueryResultsCommand, 
    QueryExecutionState, 
    StartQueryExecutionCommand, 
    
} from "@aws-sdk/client-athena"
import { AthenaQueryClientConfigInterface } from "./AthenaQueryClientConfigInterface.js";

export default class AthenaQueryClient {
    public database: string
    private client: AthenaClient
    private catalog: string
    private workgroup: string

    constructor(config: AthenaQueryClientConfigInterface) {
        this.client = new AthenaClient(config.ClientConfig)
        this.database = config.Database
        this.catalog = config.Catalog
        this.workgroup = config.WorkGroup ?? 'primary'
    }

    public async search(query: string): Promise<any> {
        const QueryInput = {
            QueryString: query,
            QueryExecutionContext: {
                Database: this.database,
                Catalog: this.catalog
            },
            WorkGroup: this.workgroup
        }

        const { QueryExecutionId } = await this.client.send(new StartQueryExecutionCommand(QueryInput));

        return await this.getQueryExecutionCommand(QueryExecutionId)
    }

    private async getQueryExecutionCommand(QueryExecutionId: string) {
        const command = new GetQueryExecutionCommand({ QueryExecutionId })

        const query = await this.client.send(command)
        const status = query.QueryExecution.Status.State

        if (status == QueryExecutionState.QUEUED || status == QueryExecutionState.RUNNING) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return await this.getQueryExecutionCommand(QueryExecutionId);
        } else if (status == QueryExecutionState.SUCCEEDED) {
            return await this.getQueryExecutionResults(QueryExecutionId)
        }
    }

    private async getQueryExecutionResults(QueryExecutionId: string) {
        const queryResultCommand = new GetQueryResultsCommand({
            QueryExecutionId
        });

        return await this.client.send(queryResultCommand);
    }
}