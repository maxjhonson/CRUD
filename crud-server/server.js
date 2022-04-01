const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {}).then((con) => {
  console.log("DB connection successful");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
