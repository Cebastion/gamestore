import mongoose from 'mongoose'
import GameSchema from './game.schema'

const UserSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  games: [GameSchema],
})

const User = mongoose.model('User', UserSchema)