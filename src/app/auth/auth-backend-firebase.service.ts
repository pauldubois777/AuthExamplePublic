import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../shared/user';
import { AuthBackendInterface } from './auth-backend.interface';
import { AuthSigninErrorsEnum } from './auth-signin-errors.enum';
import { AuthSignupErrorsEnum } from './auth-signup-errors.enum';
import { AuthSignoutStatusEnum } from './auth-signout-status.enum';
import { AuthSaveProfileStatusEnum } from './auth-save-profile-status.enum';

declare var firebase: any;

@Injectable()
export class AuthBackendFirebaseService implements AuthBackendInterface {
  currentUser = new EventEmitter<User>();
  signinError = new EventEmitter<AuthSigninErrorsEnum>();
  signupError = new EventEmitter<AuthSignupErrorsEnum>();
  signoutStatus = new EventEmitter<AuthSignoutStatusEnum>();
  saveProfileStatus = new EventEmitter<AuthSaveProfileStatusEnum>();

  constructor() {
    // The following will emit any change to the user caused by sign in, sign up, or log out.
    firebase.auth().onAuthStateChanged( (firebaseUser) => {
      if (firebaseUser) {
        let user = this.buildUserFromFirebaseUser(firebaseUser);
        this.currentUser.emit(user);
      } else {
        this.currentUser.emit(null);
      }
    });
  }

  signupUser(email: string, password: string) {
    this.currentUser.emit(null);
    this.signupError.emit(null);

    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (firebaseUser: any) => { // onAuthStateChanged in constructor will take care of emitting signed-up user
        if (!firebaseUser) {
          // This should never happen since we either sign up, or have an error
          this.currentUser.emit(null);
          this.signupError.emit(AuthSignupErrorsEnum.UNKNOWN_ERROR);
        }
      },
      (error: any) => {
          this.currentUser.emit(null);

          let signupErrorEnum: AuthSignupErrorsEnum = AuthSignupErrorsEnum.UNKNOWN_ERROR;
          switch (error.code) {
            case 'auth/email-already-in-use':
              signupErrorEnum = AuthSignupErrorsEnum.EMAIL_ALREADY_IN_USE;
              break;
            case 'auth/invalid-email':
              signupErrorEnum = AuthSignupErrorsEnum.INVALID_EMAIL;
              break;
            case 'auth/operation-not-allowed':
              signupErrorEnum = AuthSignupErrorsEnum.EMAIL_ACCOUNTS_NOT_ENABLED;
              break;
            case 'auth/weak-password':
              signupErrorEnum = AuthSignupErrorsEnum.PASSWORD_TOO_WEAK;
              break;
            default:
              signupErrorEnum = AuthSignupErrorsEnum.UNKNOWN_ERROR;
          }
          this.signupError.emit(signupErrorEnum);
      }
    );
  }

  signinUser(email: string, password: string) {
    this.currentUser.emit(null);
    this.signinError.emit(null);

    firebase.auth().signInWithEmailAndPassword(email, password).then(
      (firebaseUser: any) => { // onAuthStateChanged in constructor will take care of emitting signed-up user
        if (!firebaseUser) {
          // This should never happen since we either sign in, or have an error
          this.currentUser.emit(null);
          this.signinError.emit(AuthSigninErrorsEnum.UNKNOWN_ERROR);
        }
      },
      (error: any) => {
          this.currentUser.emit(null);
          let signinErrorEnum: AuthSigninErrorsEnum = AuthSigninErrorsEnum.UNKNOWN_ERROR;
          switch (error.code) {
            case 'auth/invalid-email':
              signinErrorEnum = AuthSigninErrorsEnum.INVALID_EMAIL;
              break;
            case 'auth/user-disabled':
              signinErrorEnum = AuthSigninErrorsEnum.USER_DISABLED;
              break;
            case 'auth/user-not-found':
              signinErrorEnum = AuthSigninErrorsEnum.USER_NOT_FOUND;
              break;
            case 'auth/wrong-password':
              signinErrorEnum = AuthSigninErrorsEnum.WRONG_PASSWORD;
              break;
            default:
              signinErrorEnum = AuthSigninErrorsEnum.UNKNOWN_ERROR;
          }
          this.signinError.emit(signinErrorEnum);
      }
    );
  }

  signoutUser() {
    this.signoutStatus.emit(null);

    firebase.auth().signOut().then(
      () => {
          this.currentUser.emit(null);
          this.signoutStatus.emit(AuthSignoutStatusEnum.SUCCESS);
      },
      (error: any) => {
          this.signoutStatus.emit(AuthSignoutStatusEnum.FAILURE);
      }
    );
  }

  getCurrentUser(): User {
    let firebaseUser = firebase.auth().currentUser;

    if (firebaseUser) {
      return this.buildUserFromFirebaseUser(firebaseUser);
    } else {
      return null;
    }
  }

  updateUserProfile(displayName: string) {
    let firebaseUser = firebase.auth().currentUser;
    if (firebaseUser === null) {
      this.saveProfileStatus.emit(AuthSaveProfileStatusEnum.UNABLE_TO_AQUIRE_USER);
    } else {
      firebaseUser.updateProfile({displayName: displayName}).then(
        () => {
          this.saveProfileStatus.emit(AuthSaveProfileStatusEnum.SUCCESS);
          this.currentUser.emit(this.getCurrentUser());
        },
        (error: any) => {
          // The firebase docs don't explain what is returned on error, so just show unknown
          this.saveProfileStatus.emit(AuthSaveProfileStatusEnum.UNKNOWN_ERROR);
        }
      );
    }
  }

  private buildUserFromFirebaseUser(firebaseUser: any): User {
    return new User(firebaseUser.uid, firebaseUser.email, firebaseUser.displayName || firebaseUser.email);
  }
}
