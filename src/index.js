import { app } from "./app.js";
import { dbConnection } from "./db/index.js";

const port = process.env.PORT || 7000

dbConnection()


app.listen(port , () => {
    console.log("The server is on this port" , port);
})