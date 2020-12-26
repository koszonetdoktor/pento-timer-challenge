import { Client } from "faunadb"

export type PluginOptions = {
    dbClient: Client
    user?: string
}

export type TrackingData = {
    name: string
    duration: number
    userRef: DbRef
}

export type DbEntry = {
    ref: { id: string }
    ts: number
    data: TrackingData
}

export type DbRef = { id: string }
