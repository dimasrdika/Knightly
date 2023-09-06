const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/user.routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4500;
app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
