import { db_router } from "./routes/db.js";
import express from "express";
import morgan from "morgan";
import { router } from "./routes/index.js";

const app = express()

app.set("port", process.env.PORT || 3000)

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/db", db_router)
app.use("/", router)

app.listen(app.get("port"), () => {
    console.log(`express listening : Connected port on ${app.get('port')}! `)
})