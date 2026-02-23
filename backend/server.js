const express = require("express");
const app = express();
const port = 3030;


//starting the server
app.listen(port, () => {
    console.log(`Server running on port, ${port}`);
})