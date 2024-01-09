const express = require('express')

const router = express.Router()
const Stage = require('../models/stageModel')

// CRUD Operations for Stage Schema

// Get all stages
router.get('/getAllStages', async (req, res) => {
  try {
    const stages = await Stage.find();
    res.json(stages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific stage by stage number
router.get('/getStageByNum/:stageNumber', async (req, res) => {
  try {
    const { stageNumber } = req.params;
    const stage = await Stage.findOne({ stageNumber });
    
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    res.json(stage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new stage
router.post('/createStage', async (req, res) => {
  try {
    const { stageNumber, questions } = req.body;
    const newStage = new Stage({ stageNumber, questions });
    const savedStage = await newStage.save();
    res.json(savedStage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a stage by stage number
router.put('/updateStage/:stageNumber', async (req, res) => {
  try {
    const { stageNumber } = req.params;
    const { questions } = req.body;

    const updatedStage = await Stage.findOneAndUpdate(
      { stageNumber },
      { questions },
      { new: true }
    );

    if (!updatedStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    res.json(updatedStage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a stage by stage number
router.delete('/deleteStage/:stageNumber', async (req, res) => {
  try {
    const { stageNumber } = req.params;
    const deletedStage = await Stage.findOneAndDelete({ stageNumber });

    if (!deletedStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    res.json({ message: 'Stage deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete a specific question by number in a stage
router.delete('/:stageNumber/questions/:questionNumber', async (req, res) => {
  try {
    const { stageNumber, questionNumber } = req.params;

    const updatedStage = await Stage.findOneAndUpdate(
      { stageNumber },
      { $pull: { questions: { number: parseInt(questionNumber) } } },
      { new: true }
    );

    if (!updatedStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }

    res.json(updatedStage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;