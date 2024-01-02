const express = require("express")
const app = express()
const router = require("./routes");
const cors = require("cors")

require('dotenv').config();

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/api/v1", router)


app.listen(PORT, ()=>{
    console.log(`app is listening ${PORT}`)
})