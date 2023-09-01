const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/user.routes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4500;

// Serve static files from frontend folder
app.use(bodyParser.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
