import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null>;

  constructor( private authService: AngularFireAuth) {
    this.user = this.authService.authState;
   }

  login(){
    try {
      this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }

  logout(){
    this.authService.signOut();
  }
}
