import { FastifyReply, FastifyRequest } from "fastify"
import { PluginOptions } from "./types"

export type FRequest = FastifyRequest<{
    Body: { name: string; duration: number }
}>

export const creationHandler = async (
    request: FRequest,
    reply: FastifyReply,
    opts: PluginOptions
): Promise<FastifyReply> => {
    const { name, duration } = request.body
    //TODO save in db
    return reply.code(201).send({
        id: "123",
        ts: 2332322323,
        name,
        duration,
    })
}
