import express, { urlencoded } from "express"
import cors from "cors"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

// configuring, what type of date we can get and other configurations.
app.use(express.json({limit: "20kb"}))//json data from frontend
app.use(express.urlencoded({extended: true, limit: "20kb"}))//data from url
app.use(express.static("public"))//to store resources on server 


//Routes import
import books from "./routes/books.routes.js"
import authors from "./routes/author.routes.js"
import users from "./routes/user.routes.js"

//Routes declarration
app.use("api/v1/books", books)
app.use("api/v1/authors", authors)
app.use("api/v1/authors", users)



export { app } 