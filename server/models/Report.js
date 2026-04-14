const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
  type: {
    type: String,
    enum: ["fuel", "maintenance"],
    required: true
  },

  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  data: {
    type: Object
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);