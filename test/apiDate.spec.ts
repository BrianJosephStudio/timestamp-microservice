const axios = require("axios")

describe("timestamp-microservice", () => {
    const baseUrl = "http://localhost:3000/api/"

    it.concurrent("Should return error when invalid date is passed in param", async () => {
        const url = `${baseUrl}invalidDate`
        const response = await axios.get(url)

        expect(response.data).toHaveProperty("error")
    })

    it.concurrent("Should return specific timeStamp when unix code is passed to param", async () => {
        const dateNow = new Date()
        const unix = dateNow.getTime().toString()
        const utc = dateNow.toUTCString()

        const url = `${baseUrl}${unix}`
        const response = await axios.get(url)

        expect(response.data).toHaveProperty("unix")
        expect(response.data).toHaveProperty("utc")
        expect(response.data.unix).toBe(unix)
        expect(response.data.utc).toBe(utc)
    })

    it.concurrent("Should return specific timeStamp when utc string is passed to param", async () => {
        const dateNow = new Date()
        const unix = dateNow.getTime().toString().replace(/...$/, "000")
        const utc = dateNow.toUTCString()

        const url = `${baseUrl}${utc}`
        const response = await axios.get(url)

        expect(response.data).toHaveProperty("unix")
        expect(response.data).toHaveProperty("utc")
        expect(response.data.unix).toBe(unix)
        expect(response.data.utc).toBe(utc)
    })

    it.concurrent("Should return specific timeStamp when iso string is passed to param", async () => {
        const dateNow = new Date()
        const unix = dateNow.getTime().toString()
        const utc = dateNow.toUTCString()
        const iso = dateNow.toISOString()

        const url = `${baseUrl}${iso}`
        const response = await axios.get(url)

        expect(response.data).toHaveProperty("unix")
        expect(response.data).toHaveProperty("utc")
        expect(response.data.unix).toBe(unix)
        expect(response.data.utc).toBe(utc)
    })

    it.concurrent("Should return current date if data param is empty", async () => {
        const dateNow = new Date();
        const unix = Math.floor(dateNow.getTime() / 1000);
        const utc = dateNow.toUTCString();

        const response = await axios.get(baseUrl);
        const responseUnix = Math.floor(parseInt(response.data.unix) / 1000);

        expect(response.data).toHaveProperty("unix");
        expect(response.data).toHaveProperty("utc");
        expect(responseUnix).toBeCloseTo(unix, 0);
        expect(response.data.utc).toBe(utc);
    })
})
