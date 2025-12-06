const connectToMongo = require('./db.js');
const express = require('express');
const cors = require("cors");
const app = express()
const port = process.env.PORT || 3000


const allowedOrigins = [
    "http://localhost:3005",      // local frontend
    process.env.FRONTEND_URL      // deployed frontend domain
].filter(Boolean);                // remove undefined values



app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"]
}));



connectToMongo();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is home page')
})


//authenticate a user or signup a user
app.use("/api/auth", require("./routes/auth"))

// Notes
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})