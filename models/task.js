const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String },
  description: { type: String, required: false },
})

module.exports = mongoose.model("Task", taskSchema)
