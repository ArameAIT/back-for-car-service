import express from "express"
import authRouter from "./routes/auth"
import cors from "cors" 

const app  = express()
const PORT : number = 4000

app.use(express.json())
app.use(cors())

app.use("/auth",authRouter)
app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`);
})