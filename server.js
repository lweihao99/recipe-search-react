const mongoose = require("mongoose");

const app = require("./app");

const DB =
  "mongodb+srv://weihaoliu99:lweihao99@user.vouxsb2.mongodb.net/recipe?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to mongodb"));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
