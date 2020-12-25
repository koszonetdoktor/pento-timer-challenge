import { FastifyError, FastifyInstance } from "fastify"
import { IncomingMessage, Server, ServerResponse } from "http"
import { retrievalHandler } from "./retrieval"
import creationSchema from "./creation.body.schema.json"
import { creationHandler } from "./creation"

type PluginOptions = {}

type FPluginCb = (err?: FastifyError) => void

export const plugin = (
    fastify: FastifyInstance,
    opts: PluginOptions,
    next: FPluginCb
): void => {
    fastify.get("/trackings", retrievalHandler)
    fastify.post(
        "/trackings",
        { schema: { body: creationSchema } },
        creationHandler
    )
    next()
}
