var express = require("express");

var router = express.Router();

//Mongoose to manage relationships between data, has schema validation
const mongoose = require("mongoose");

const { dbUrl } = require("../config/dbconfig");

const { queryModel } = require("../schema/querySchema");

const { customerModel } = require("../schema/customerSchema");

//to connect to db
mongoose.connect(dbUrl);

//to create a new query
router.post("/create-query", async (req, res) => {
  try {
    let user = await customerModel.findOne({ email: req.body.email });

    let doc = new queryModel({
      name: user.firstName,
      email: user.email,
      productCategory: req.body.productCategory,
      BrandName: req.body.BrandName,
      issue: req.body.issue,
      dateOfPurchase: req.body.date,
    });

    await doc.save();
    res.status(201).send({
      message: "Query Created successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

//to get query details based on email
router.get("/getQuery/:email", async (req, res) => {
  try {
    //console.log(req.params.email);
    let query = await queryModel.find({ email: req.params.email });
    console.log(query);

    res.status(200).send({
      query,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

//to get all the queries
router.get("/getAllQueries", async (req, res) => {
  try {
    let query = await queryModel.find();
    console.log(query);

    res.status(200).send({
      query,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

//to update the status of the query
router.post("/updateStatus", async (req, res) => {
  try {
    let query = await queryModel.findByIdAndUpdate(
      { _id: req.body.queryId },
      { status: req.body.Status }
    );
    console.log(query);

    res.status(200).send({
      message: "Status Updated Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

module.exports = router;
