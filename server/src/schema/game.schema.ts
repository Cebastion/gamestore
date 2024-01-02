import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  Image: String,
  Name: String,
  Tag: [String],
  Price: String,
})

export default GameSchema