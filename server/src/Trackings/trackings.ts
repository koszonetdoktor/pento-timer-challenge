import { FastifyError, FastifyInstance } from "fastify"
import { IncomingMessage, Server, ServerResponse } from "http"
import { retrievalHandler } from "./retrieval"

type PluginOptions = {}

type FPluginCb = (err?: FastifyError) => void

export const plugin = (
    fastify: FastifyInstance,
    opts: PluginOptions,
    next: FPluginCb
): void => {
    fastify.get("/trackings", retrievalHandler)
    next()
}
