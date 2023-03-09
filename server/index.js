const express=require("express");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

app.listen(5000, (req, res) => {
    console.log("Listenin to port 5000");
})
