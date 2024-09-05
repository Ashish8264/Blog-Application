const express = require("express");
const cors=require("cors")
const app = express();
const PORT = 9000;
const { connectToMongo } = require("./config/db.js");
const router = require("./routes/blog.js");

connectToMongo();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>API is running</h1>");
});
//api Routes
app.use("/api/v1", router);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
