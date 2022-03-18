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

  authState: any;

  constructor( private authService: AngularFireAuth) {
    this.user = this.authService.authState;

    this.authService.authState.subscribe(
      data => this.authState = data
    )
  }

  // deternima si un usuario esta logueado
  get authenticated(): boolean {
    return this.authState !== null
  }

  // siesta logueado obtenemos el id del usuario.
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  // iniciar sesion
  login(){
    try {
      this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }

  // cerrar sesion
  logout(){
    this.authService.signOut();
  }
}
