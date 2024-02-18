import { AthenaClientConfig } from "@aws-sdk/client-athena";

export interface AthenaQueryClientConfigInterface {
    ClientConfig: AthenaClientConfig;
    Database: string;
    Catalog: string;
    WorkGroup?: string;
}