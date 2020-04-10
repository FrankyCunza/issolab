import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { from } from 'rxjs';
import { User } from '../shared/user.class'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false; //si el susuario est logueado o no

  constructor(
    public afAuth: AngularFireAuth
  ) { 
    afAuth.authState.subscribe( user => (this.isLogged = user));
  }

  //login
  async onLogin (user: User) {
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(
        user.email, 
        user.password
        );
    } catch (error){
      console.log('Error on login user ', error);
    }
  }

  //register
  async onRegister (user: User){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email, 
        user.password
      )
    }catch (error){
      console.log('Error on register user', error);
    }
  }
}
