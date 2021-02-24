const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    user: {
      $db: String,
      $id: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    versionKey: false,
  }
);

const Account = mongoose.model("Account", AccountSchema, "Account");

module.exports = Account;
