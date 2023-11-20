const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BankAccountSchemaModel = new Schema({
  id: Schema.ObjectId,
  chequingAccountBalance: {
    type: Number,
    default: 0,
    required: false,
  },
  savingsAccountBalance: {
    type: Number,
    default: 0,
    required: false,
  },
  client: { type: Schema.Types.ObjectId, ref: "Client" },
});

const BankAccountModel = mongoose.model("BankAccount", BankAccountSchemaModel);

module.exports = BankAccountModel;
