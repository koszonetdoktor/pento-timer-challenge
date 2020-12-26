import { FastifyError, FastifyInstance } from "fastify"
import { retrievalHandler } from "./retrieval"
import creationSchema from "./creation.body.schema.json"
import { creationHandler, FRequest as CreationRequest } from "./creation"
import { PluginOptions } from "./types"

type FPluginCb = (err?: FastifyError) => void

export const plugin = (
    fastify: FastifyInstance,
    opts: PluginOptions,
    next: FPluginCb
): void => {
    fastify
        .get("/trackings", (req, reply) => retrievalHandler(req, reply, opts))
        .post(
            "/trackings",
            { schema: { body: creationSchema } },
            (req: CreationRequest, reply) => creationHandler(req, reply, opts)
        )
    next()
}
