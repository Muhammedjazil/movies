require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connectDb=require("./config/db")
const PORT = process.env.PORT || 9000;
const movieRoute=require("./routes/movieRoute")
const app=express()
app.use(express.json())
app.use(cors())
connectDb()

app.use("/movie",movieRoute)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});