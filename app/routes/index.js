import express from "express";

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Main page")
    console.log("Connected: Hello, world! ")
})

router.use((req, res) => res.send(`404 NOT FOUND`))

export { router };
