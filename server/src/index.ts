import { config } from "dotenv"
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fastifyStatic from "fastify-static"
import fastifyBasicAuth from "fastify-basic-auth"
import { plugin as trackingsPlugin } from "./Trackings/trackings"
import path from "path"

const instance: FastifyInstance = Fastify()

const validate = (
    username: string,
    password: string,
    request: FastifyRequest,
    reply: FastifyReply,
    done: (error?: Error) => void
) => {
    if (
        username === process.env.USERNAME &&
        password === process.env.PASSWORD
    ) {
        done()
    } else {
        done(new Error("Wrong credentials!"))
    }
}

let port = process.env.PORT || 3001

;(async () => {
    config()

    //TODO fauna

    instance
        .register(fastifyStatic, {
            root: path.join(__dirname, "../../ui/public"),
        })
        .register(trackingsPlugin)
        .register(fastifyBasicAuth, { validate, authenticate: true })
        .after(() => {
            instance.addHook("preHandler", instance.basicAuth)
            instance.get("/", (_, reply) => {
                reply.sendFile("index.html")
            })
        })

    await instance.listen(port)
})()
