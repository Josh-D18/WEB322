const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClientSchemaModel = new Schema({
  id: Schema.ObjectId,
  username: String,
  chequingAccountNumber: {
    type: String,
    required: false,
  },
  savingsAccountNumber: {
    type: String,
    required: false,
  },
  savingsAccountBalance: {
    type: Number,
    required: false,
  },
  chequingAccountBalance: {
    type: Number,
    required: false,
  },
});

const ClientModel = mongoose.model("Client", ClientSchemaModel);

module.exports = ClientModel;
