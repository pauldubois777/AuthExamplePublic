import { Injectable, EventEmitter } from '@angular/core';

import { User } from '../shared/user';
import { AuthBackendFirebaseService } from './auth-backend-firebase.service';
import { AuthSigninErrorsEnum } from './auth-signin-errors.enum';
import { AuthSignupErrorsEnum } from './auth-signup-errors.enum';
import { AuthSignoutStatusEnum } from './auth-signout-status.enum';
import { AuthSaveProfileStatusEnum } from './auth-save-profile-status.enum';

@Injectable()
export class AuthService {
  currentUser = new EventEmitter<User>();
  errorMessage = new EventEmitter<string>();
  saveProfileMessage = new EventEmitter<string>();
  signOutStatus = new EventEmitter<AuthSignoutStatusEnum>();

  constructor(private authBackendService: AuthBackendFirebaseService) {
      this.authBackendService.currentUser.subscribe(
        (user: User) => { this.currentUser.emit(user); }
      );

      this.authBackendService.signinError.subscribe(
        (signinErrorEnum: AuthSigninErrorsEnum) => {
          let signinErrorMessage = '';
          switch (signinErrorEnum) {
            case AuthSigninErrorsEnum.INVALID_EMAIL :
            case AuthSigninErrorsEnum.USER_NOT_FOUND :
            case AuthSigninErrorsEnum.WRONG_PASSWORD :
              signinErrorMessage = 'User not found or incorrect password.  Please try again.';
              break;
            case AuthSigninErrorsEnum.USER_DISABLED :
              signinErrorMessage = 'Unable to sign in: Your account has been disabled.';
              break;
            case AuthSigninErrorsEnum.UNKNOWN_ERROR :
              signinErrorMessage = 'Unknow Error.  Please try again.';
              break;
            default:
              signinErrorMessage = 'Unknown Sign-In Error Enumerator.  Please contact technical support.';
          }
          this.errorMessage.emit(signinErrorMessage);
        }
      );

      this.authBackendService.signupError.subscribe(
        (signupErrorEnum: AuthSignupErrorsEnum) => {
          let signupErrorMessage = '';
          switch (signupErrorEnum) {
            case AuthSignupErrorsEnum.EMAIL_ALREADY_IN_USE :
              signupErrorMessage = 'This email address is already in use.  Please use a different address or sign in.';
              break;
            case AuthSignupErrorsEnum.INVALID_EMAIL :
              signupErrorMessage = 'Please enter a valid email address.';
              break;
            case AuthSignupErrorsEnum.PASSWORD_TOO_WEAK :
              signupErrorMessage = 'The password you entered is too weak.  Please enter a different password.';
              break;
            case AuthSignupErrorsEnum.EMAIL_ACCOUNTS_NOT_ENABLED :
              signupErrorMessage = 'Email accounts are not allowed.';
              break;
            case AuthSignupErrorsEnum.UNKNOWN_ERROR :
              signupErrorMessage = 'Unknow Error.  Please try again.';
              break;
            default:
              signupErrorMessage = 'Unknown Sign-Up Error Enumerator.  Please contact technical support.';
          }
          this.errorMessage.emit(signupErrorMessage);
        }
      );

      this.authBackendService.signoutStatus.subscribe(
        (signoutStatus: AuthSignoutStatusEnum) => {
          this.signOutStatus.emit(signoutStatus);
        }
      );

      this.authBackendService.saveProfileStatus.subscribe(
        (saveProfileStatusEnum: AuthSaveProfileStatusEnum) => {
          let saveProfileStatus = '';
          switch (saveProfileStatusEnum) {
            case AuthSaveProfileStatusEnum.UNABLE_TO_AQUIRE_USER :
              saveProfileStatus = 'Unable to aquire user for update.  Please try again, or re-login.';
              break;
            case AuthSaveProfileStatusEnum.SUCCESS :
              saveProfileStatus = 'Profile Updated.';
              break;
            case AuthSaveProfileStatusEnum.UNKNOWN_ERROR :
              saveProfileStatus = 'Unable to update profile: Unknow error.  Please try again.';
              break;
            default:
              saveProfileStatus = 'Unknown Save-Profile-Status Enumerator.  Please contact technical support.';
          }
          this.saveProfileMessage.emit(saveProfileStatus);
        }
      );
  }

  signupUser(email: string, password: string) {
    this.currentUser.emit(null);
    this.errorMessage.emit(null);
    this.authBackendService.signupUser(email, password);
  }

  signinUser(email: string, password: string) {
    this.currentUser.emit(null);
    this.errorMessage.emit(null);
    this.authBackendService.signinUser(email, password);
  }

  signoutUser() {
    this.signOutStatus.emit(null);
    this.authBackendService.signoutUser();
  }

  getCurrentUser(): User {
    return this.authBackendService.getCurrentUser();
  }

  updateUserProfile(displayName: string) {
    this.authBackendService.updateUserProfile(displayName);
  }
}
