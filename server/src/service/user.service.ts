import { IUser } from '../interface/user.interface'
import { MongoDB } from './mongodb.service'

export class UserService extends MongoDB{

  LogIn(email: string, password: string){
    super.ConnectionDB()
    const user = super.SearchUser(email, password)
    super.DisconnectDB()
    return user
  }


  SignIn(name: string, email: string, password: string){
    const NewUser: IUser = {
      Name: name,
      Email: email,
      Password: password
    }
    super.ConnectionDB()
    const user = super.CreateUser(NewUser)
    super.DisconnectDB()
    return user
  }
}