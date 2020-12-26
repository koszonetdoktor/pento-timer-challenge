import { FastifyReply, FastifyRequest } from "fastify"
import { DbEntry, PluginOptions, TrackingData } from "./types"
import faunadb from "faunadb"

const q = faunadb.query

type RequestBody = Omit<TrackingData, "userRef">

export type FRequest = FastifyRequest<{
    Body: RequestBody
}>

export const creationHandler = async (
    request: FRequest,
    reply: FastifyReply,
    opts: PluginOptions
): Promise<FastifyReply> => {
    try {
        if (opts.user === undefined) {
            return reply.code(400).send({ error: "User could not be found!" })
        }
        const { name, duration } = request.body
        const response: DbEntry = await opts.dbClient.query(
            q.Let(
                {
                    user: q.Get(q.Match(q.Index("users_by_email"), opts.user)),
                },
                q.Create(q.Collection("trackings"), {
                    data: {
                        name,
                        duration,
                        userRef: q.Select("ref", q.Var("user")),
                    },
                })
            )
        )
        return reply.code(201).send({
            name,
            duration,
            id: response.ref.id,
            ts: response.ts / 1000,
        })
    } catch (err) {
        console.error(err)
        return reply.code(400).send({ error: "Tracking could not be created!" })
    }
}
