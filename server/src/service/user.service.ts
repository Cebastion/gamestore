import { IUser } from '../interface/user.interface'
import { MongoDB } from './mongodb.service'

export class UserService{
  private db = new MongoDB()

  LogIn(email: string, password: string){
    this.db.ConnectionDB()
    const user = this.db.SearchUser(email, password)
    this.db.DisconnectDB()
    return user
  }


  SignIn(name: string, email: string, password: string){
    const NewUser: IUser = {
      Name: name,
      Email: email,
      Password: password
    }
    this.db.ConnectionDB()
    const user = this.db.CreateUser(NewUser)
    this.db.DisconnectDB()
    return user
  }
}