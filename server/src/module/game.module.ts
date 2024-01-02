import mongoose from 'mongoose'
import GameSchema from '../schema/game.schema'

const Game = mongoose.model('Game', GameSchema)

export { Game }