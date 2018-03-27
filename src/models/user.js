const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, //response nao devolve a senha
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//model(name, Schema)
const User = mongoose.model('User', UserSchema);

module.exports = User;