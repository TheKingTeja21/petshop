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
const paymentRouter = require("./routes/paymentRoutes");
const productRouter = require("./routes/Products");
const accessoriesRouter = require("./routes/accerssories");
const hospitalRouter = require("./routes/veteryhospital");
const appointmentRouter = require("./routes/appointment");
const Crossing = require("./routes/Crossing");
const animal = require("./routes/animal");
const ABOUTpet= require("./routes/aboutepet");
const Vaccination= require("./routes/vaccination");
const mypet= require("./routes/mypet");
const broding=require("./routes/Broding")
const Hospital = require("./routes/Hospital")
dotenv.config();
const serviceAccount = require("./firebaseKey.json");
const Broding = require("./controllers/Broding");

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
app.use("/api/category", CategoriesRouter);
app.use("/api/accessories", accessoriesRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/Crossing", Crossing);
app.use("/api/aboutanimal",animal);
app.use("/api/Broding",broding);
app.use("/api/Hospital",Hospital);
app.use("/api/mypet",mypet);
app.use("/api/Aboutepet",ABOUTpet);
app.use("/api/Vaccination",Vaccination);
app.use("/api/appointment",appointmentRouter);
app.use("/api/payment",paymentRouter);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
