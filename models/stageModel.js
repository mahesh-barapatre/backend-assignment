const mongoose = require('mongoose')

const stageSchema = new mongoose.Schema({
  stageNumber: { type: Number, unique: true },
  questions: [
    {
      number: { type: Number, unique: true },
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;