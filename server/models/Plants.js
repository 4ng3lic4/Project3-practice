//This file will replace Thoughts.js
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
//What is this saltRounds?
const saltRounds = 10;


//Check if light and  price are also a Strings
const plantsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,

  },
  price: {
    type: String,
    required: true,
  },

  animalSafe: {
    type: String,
    required: true,
  },

  careLevel: {
    type: String,
    required: true,
  },

  growthHabit: {
    type: String,
    required: true,
  },

  soilRequirement: {
    type: String,
    required: true,
  },

  light: {
    type: String,
    required: true,
  },

  Air: {
    type: String,
    required: true,
  },

//   thoughts: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Thought',
//     },
//   ],
});
// created pre-hook functions I could export for the purpose of testing
const hashPassword = async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
};

// created pre-hook functions I could export for the purpose of testing
const hashAllPasswords = async function (next, docs) {
  if(Array.isArray(docs) && docs.length) {
    const hashedUsers = docs.map( async (user) => {
      user.password = await bcrypt.hash(user.password, saltRounds);
      return user;
    });
    const users = await Promise.all(hashedUsers);
    next();
  }
  else{
    return next(new Error("User list should not be empty"));
  }

  next();
};

// set up pre-save middleware to create password
userSchema.pre('save', hashPassword);
userSchema.pre('insertMany', hashAllPasswords);

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

if(process.env.NODE_ENV === "test"){
  module.exports = { 
    User,
    //UNIT TEST EXPORT
    userSchema,
    //UNIT TEST EXPORT
    hashPassword,
    //UNIT TEST EXPORT
    hashAllPasswords
  };
}
else{
  module.exports = { 
    User
  };
}