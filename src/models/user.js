const mongoose = require('../database');
const bcryptjs = require('bcryptjs');

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

UserSchema.pre('save', async function(next) {
  // this se refere ao objeto que está semdo salvado
  const hash =await bcryptjs.hash(this.password, 10);
  this.password = hash;

  next();
});

//model(name, Schema)
const User = mongoose.model('User', UserSchema);

module.exports = User;