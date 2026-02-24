const express = require("express"); 
const cors = require("cors");
const configureDB = require("./src/config/db");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
configureDB();

//middleware
app.use(express.json());
app.use(cors());


// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/habits", require("./routes/habitRoutes"));
// app.use("/api/logs", require("./routes/logRoutes"));


//starting the server
app.listen(port, () => {
    console.log(`Server running on port, ${port}`);
})