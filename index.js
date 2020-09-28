const express = require("express");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const uri =
  "mongodb+srv://organicUser:CAibz7e2QanfJX2r@cluster0.dq44d.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

client.connect((err) => {
  const productCollection = client.db("organicdb").collection("products");

  app.get("/products", (req, res) => {
    productCollection
      .find({})
      // .limit(4)
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.post("/addProducts", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product).then((result) => {
      console.log("added successfully");
      res.send("success");
    });
  });
});
app.listen(2000);
