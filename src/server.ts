import { Request, Response } from 'express';
const express = require("express")
const app = express()

app.get("/api/:date?", (req: Request, res: Response) => {
    const dateParam = req.params.date

    const isInt = /^\d+$/.test(dateParam)
    const isNaN = Number.isNaN(Date.parse(dateParam))

    let paramDate: Date = new Date()

    if (isInt) {
        const dateParamAsNumber = parseInt(dateParam)
        paramDate = new Date(dateParamAsNumber)
    }

    if ( dateParam && !isInt && !isNaN ) {
        paramDate = new Date(dateParam)
    }

    if ( dateParam && !isInt && isNaN ) {
        return res.json({ error: "Invalid Date" })
    }

    return res.json({
        unix: paramDate.getTime(),
        utc: paramDate.toUTCString()
    })
})

app.listen(3000, () => {
    console.log("Listening on 3000")
})