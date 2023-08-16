const mongoose = require("mongoose");

//schema to visualize how a database should be structured
const querySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    productCategory: { type: String, required: true },
    BrandName: { type: String, required: true },
    issue: { type: String, required: true },
    dateOfPurchase: { type: String, required: true },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false, collection: "Queries" }
);

//model provides an interface to the database for creating, querying, updating, deleting records, etc.
const queryModel = mongoose.model("Queries", querySchema);
module.exports = { queryModel };
