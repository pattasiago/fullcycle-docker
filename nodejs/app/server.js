import insertPerson from "./index.js";
import express from "express"

const PORT = 3000;

const listenServer = async () => {
    var app = express()
    app.get("/", async function(request,response) {
        const result = await insertPerson()
        response.send(result)
    })

    return app.listen(PORT, () => {
        console.log(`Server is running in host: http://localhost:${PORT}`);
    })
}

listenServer();