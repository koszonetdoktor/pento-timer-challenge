const faunadb = require("faunadb")
const dotenv = require("dotenv")

dotenv.config()

const q = faunadb.query

if (!process.env.FAUNA_SECRET) {
    console.log("Required FAUNA_SECRET enviroment variable not found.")
    process.exit()
}

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
})

;(async () => {
    try {
        console.log("Bootstraping db...")
        console.log("Creating users collection")
        await client.query(q.CreateCollection({ name: "users" }))
        console.log("Creating users index")
        await client.query(
            q.CreateIndex({
                name: "users_by_email",
                source: q.Collection("users"),
                terms: [{ field: ["data", "email"] }],
                unique: true,
            })
        )
        console.log("Creating trackings collection")
        await client.query(q.CreateCollection({ name: "trackings" }))
        console.log("Creating trackings index")
        await client.query(
            q.CreateIndex({
                name: "trackings_by_userRef",
                source: q.Collection("trackings"),
                terms: [{ field: ["data", "userRef"] }],
            })
        )
        console.log("Creating admin user")
        await client.query(
            q.Create(q.Collection("users"), {
                credentials: { password: "admin" },
                data: {
                    email: "admin@example.com",
                },
            })
        )
    } catch (err) {
        console.error(err)
    }
})()
