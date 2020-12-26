import { FastifyReply, FastifyRequest } from "fastify"
import { PluginOptions, TrackingData } from "./types"
import faunadb from "faunadb"

const q = faunadb.query

type ResponseData = Omit<TrackingData, "userRef"> & { id: string; ts: number }

export const retrievalHandler = async (
    request: FastifyRequest,
    reply: FastifyReply,
    opts: PluginOptions
): Promise<FastifyReply> => {
    try {
        if (opts.user === undefined) {
            return reply.code(400).send({ error: "User could not be found!" })
        }
        const response: ResponseData[] = await opts.dbClient.query(
            q.Let(
                {
                    user: q.Get(q.Match(q.Index("users_by_email"), opts.user)),
                    trackingSet: q.Match(
                        q.Index("trackings_by_userRef"),
                        q.Select("ref", q.Var("user"))
                    ),
                },
                q.If(
                    q.IsEmpty(q.Var("trackingSet")),
                    [],
                    q.Reverse(
                        q.Map(
                            q.Paginate(q.Var("trackingSet")),
                            q.Lambda(
                                "trackingRef",
                                q.Let(
                                    {
                                        tracking: q.Get(q.Var("trackingRef")),
                                    },
                                    {
                                        id: q.Select(
                                            ["ref", "id"],
                                            q.Var("tracking")
                                        ),
                                        ts: q.ToMillis(
                                            q.Select("ts", q.Var("tracking"))
                                        ),
                                        name: q.Select(
                                            ["data", "name"],
                                            q.Var("tracking")
                                        ),
                                        duration: q.Select(
                                            ["data", "duration"],
                                            q.Var("tracking")
                                        ),
                                    }
                                )
                            )
                        )
                    )
                )
            )
        )
        return reply.code(200).send(response)
    } catch (err) {
        console.error(err)
        return reply
            .send(400)
            .send({ error: "Tracking could not be retrieved!" })
    }
}
