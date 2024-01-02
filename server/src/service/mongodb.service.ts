import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../module/user.module'
import { IUser } from '../interface/user.interface'
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

  async DisconnectDB(){
    await mongoose.disconnect()
    console.log('DisConnect DB')
  }

  async SearchUser(email: string, password: string){
    const user = await User.findOne({email: email, password: password}).exec()
    if (!!user) {
      return user
    } else {
      return null
    }
  }

  async CreateUser(NewUser: IUser){
    const user = await User.create(NewUser)
    return user
  }
}