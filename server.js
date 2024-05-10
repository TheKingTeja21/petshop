const express = require("express");
const app = express();
const mogoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const port = 3000;
const admin = require("firebase-admin");
const userRouter = require("./routes/user");
const authrouter = require("./routes/auth");
const animalshoproute = require("./routes/animalshop");
const cartrouter = require("./routes/cart");
const OrderRouter = require("./routes/order");
const CategoriesRouter = require("./routes/Category");
const productRouter = require("./routes/Products");
const payment = require("./routes/Payment");
const accessoriesRouter = require("./routes/accerssories");
const hospitalRouter = require("./routes/veteryhospital");
const Crossing = require("./routes/Crossing");
const animal = require("./routes/animal");

dotenv.config();
const serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mogoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/", authrouter);
app.use("/api/users", userRouter);
app.use("/api/animalshop", animalshoproute);
app.use("/api/cart", cartrouter);
app.use("/api/product", productRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/createPayment", payment);
app.use("/api/category", CategoriesRouter);
app.use("/api/accessories", accessoriesRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/Crossing", Crossing);
app.use("/api/aboutanimal",animal);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
