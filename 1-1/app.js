const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const app = express();
const port = 8000;


app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/employeCompanyDB').then(() => {
  console.log("DB is connected.");
});


  
  const shema = new Schema({
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    shipping: {
      weight: {
        type: Number,
        required: true
      },
      dimensions: {
        width: {
          type: Number,
          required: true
        },
        height: {
          type: Number,
          required: true
        },
        depth: {
          type: Number,
          required: true
        }
      }
    },
    pricing: {
      list: {
        type: Number,
        required: true
      },
      retail: {
        type: Number,
        required: true
      },
      savings: {
        type: Number,
        required: true
      },
      pct_savings: {
        type: Number,
        required: true
      }
    },
    details: {
      title: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        required: true
      },
      genre: {
        type: [String],
        required: true
      },
      tracks: {
        type: [String],
        required: true
      }
    }
  });
  
  const hw16 = mongoose.model('hw16', shema);

app.get('/a' , async(req , res) =>{
  console.log(hw16)
  let a = await hw16.find();
  res.json(a)
})
app.get('/b' , async(req , res) =>{
  console.log(hw16)
  let a = await hw16.find().select("-_id");
  res.json(a)
})

app.get('/c' , async(req , res) =>{
  let a = await hw16.find({ type: "Audio Album" });
  res.json(a)
})

app.get('/d' , async(req , res) =>{
  let a = await hw16.find({
    "pricing.retail": { $lt: 5000 },
  });
  res.json(a)
})
app.get('/e' , async(req , res) =>{
  let a = await hw16.find({
    type: { $ne: "Film" },
  })
  res.json(a)
})
app.get('/f' , async(req , res) =>{
  let a = await hw16.find({
    "shipping.weight": { $gt: 15 },
  });
  res.json(a)
})

app.get('/g' , async(req , res) =>{
  let a = await hw16.findOneAndUpdate(
    {
      "details.title": "The Matrix",
    },
    { "pricing.list": 2500 },
    { new: true }
  );
  res.json(a)
})

app.get('/h' , async(req , res) =>{
  let a = await hw16.find({
    $and: [{ type: "Film" }, { "shipping.dimensions.depth": 1 }],
  });
  res.json(a)
})

app.get('/i' , async(req , res) =>{
  let a = await hw16.count({ type: "Film" });
  res.json(a)
})

app.get('/k' , async(req , res) =>{
  let a = await hw16.findOne().sort({
    "pricing.savings": -1,
  });
  res.json(a)
})

app.get('/l' , async(req , res) =>{
  let a = await hw16.find({ "details.title": /x/i });
  res.json(a)
})
app.get('/m' , async(req , res) =>{
  let a = await hw16.findOneAndDelete({
    "details.aspect_ratio": "1.66:1",
  });
  res.json(a)
})










app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

