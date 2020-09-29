const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ObjectID = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

const uri =
  "mongodb+srv://organicUser:CAibz7e2QanfJX2r@cluster0.dq44d.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

client.connect(() => {
  const collection = client.db("testCrud").collection("allUser");

  // data add route
  app.post("/addUser", (req, res) => {
    collection
      .insertOne(req.body)
      .then(() => res.send({ msg: "Users have been added successfully" }))
      .catch((err) => res.send({ error: err }));
  });

  // All data get route
  app.get("/getUser", (req, res) => {
    collection
      .find({})
      .toArray()
      .then((result) => res.send(result));
  });

  // update data show route
  app.get("/updateGetData/:id", (req, res) => {
    let id = new ObjectID(req.params.id);
    collection
      .find({ _id: id })
      .toArray()
      .then((result) => res.send(result[0]))
      .catch((err) => res.send({ error: err }));
  });

  // data update route
  app.put("/updateData", (req, res) => {
    let id = new ObjectID(req.body.dataId);
    const { fname, lname, email, password, number } = req.body;
    collection.updateOne(
      { _id: id },
      { $set: { fname, lname, email, password, number } },
      (result) => {
        res.send({ msg: "Users have been update successfully" });
      }
    );
  });

  // data delete route
  app.delete("/deleteData", (req, res) => {
    let id = new ObjectID(req.body.id);
    collection
      .deleteOne({
        _id: id,
      })
      .then(() => res.send({ msg: "successfully deleted" }))
      .catch((err) => res.send({ error: err }));
  });
});

// site home page route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let PORT = process.env.PORT || 2000;
app.listen(PORT);

// const express = require("express");
// const bodyParser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectId;
// const uri =
//   "mongodb+srv://organicUser:CAibz7e2QanfJX2r@cluster0.dq44d.mongodb.net/organicdb?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// client.connect((err) => {
//   const productCollection = client.db("organicdb").collection("products");

//   app.get("/products", (req, res) => {
//     productCollection.find({}).toArray((err, documents) => {
//       res.send(documents);
//     });
//   });

//   app.get("/product/:id", (req, res) => {
//     productCollection
//       .find({ _id: ObjectId(req.params.id) })
//       .toArray((err, documents) => {
//         res.send(documents[0]);
//       });
//   });

//   app.post("/addProduct", (req, res) => {
//     const product = req.body;
//     productCollection.insertOne(product).then((result) => {
//       res.redirect("/");
//     });
//   });

//   app.patch("/update/:id", (req, res) => {
//     productCollection
//       .updateOne(
//         { _id: ObjectId(req.params.id) },
//         {
//           $set: { price: req.body.price, quantity: req.body.quantity },
//         }
//       )
//       .then((result) => {
//         res.send(result.modifiedCount > 0);
//       });
//   });

//   app.delete("/delete/:id", (req, res) => {
//     productCollection
//       .deleteOne({ _id: ObjectId(req.params.id) })
//       .then((result) => {
//         res.send(result.deletedCount > 0);
//       });
//   });
// });

// app.listen(2000);
