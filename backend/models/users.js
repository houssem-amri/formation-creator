const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, require: true },
});
const user = mongoose.model("User", userSchema);

module.exports = user;
