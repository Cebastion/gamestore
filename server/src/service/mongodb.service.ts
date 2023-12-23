import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export class MongoDB {
  async ConnectionDB() {

    if (process.env.CONNECT_MONGODB === undefined) {
      return 0;
    }

    await mongoose.connect(process.env.CONNECT_MONGODB)
    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected DB')
    })
  }

  DisconnectDB(){
    mongoose.disconnect()
    console.log('DisConnect DB')
  }
}