import path from 'path'
import fs from 'fs'
import { IGames } from '../interface/game.interface'
import { IUser } from '../interface/user.interface'

export class UserService{
  private name: string
  private password: string
  private email: string
  private games: IGames

  private WriteUser(User: IUser) {
    const directory = path.resolve(__dirname, '/users')
    if(!fs.existsSync(directory)){
      fs.mkdirSync(directory)
    }
    const UserJson = JSON.stringify(User)
    fs.writeFileSync(directory + '/users.json', UserJson)
  }

  private ReadUser(){
    const directory = path.resolve(__dirname, '/users')
    const User = fs.readFileSync(directory + '/users.json', 'utf-8')
    return User
  }

  constructor(name: string, password: string, email:string, games: IGames){
    this.name = name
    this.password = password
    this.email = email
    this.games = games
  }

  LogIn(User: IUser){
    const isAuthenticated = User.Email === this.email && User.Password === this.email
    if(isAuthenticated){
      this.ReadUser()
    } else {
      return {message: ""}
    }
  }


  SignIn(User:IUser){
    User = {
      Name: this.name,
      Email: this.email,
      Password: this.password,
    }
    this.WriteUser(User)
  }
}