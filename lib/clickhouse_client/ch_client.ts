
import { createClient } from "@clickhouse/client";


export const ch_client = createClient({
    url: process.env.CLICKHOUSE_DB_URL as string,
})

