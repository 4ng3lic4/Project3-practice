const { Schema, model } = require("mongoose");

//Check if light and  price are also a Strings
const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  plantAuthor: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
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
  comments: [
    {
      comment_text: {
        type: String,
      },
      comment_author: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
  ],
});

const Plant = model("Plant", plantSchema);

module.exports = {
  Plant,
};
