import { FastifyReply, FastifyRequest } from "fastify"
import { PluginOptions } from "./types"

export const retrievalHandler = async (
    request: FastifyRequest,
    reply: FastifyReply,
    opts: PluginOptions
): Promise<FastifyReply> => {
    console.log("header", request.headers)
    console.log("trackings!")

    return reply.code(200).send([
        {
            name: "Uber",
            id: "1",
            duration: 345,
            ts: 1606389238970,
        },
        {
            name: "Airbnb",
            id: "2",
            duration: 33455,
            ts: 1605861771410,
        },
        {
            name: "Twitter23",
            id: "3",
            duration: 35,
            ts: 1606990975870,
        },
        {
            name: "Basecamp",
            id: "4",
            duration: 3455,
            ts: 1605861763190,
        },
    ])
}
