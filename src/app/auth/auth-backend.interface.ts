import { EventEmitter } from '@angular/core';

import { User } from "../shared/user";
import { AuthSigninErrorsEnum } from './auth-signin-errors.enum';
import { AuthSignupErrorsEnum } from './auth-signup-errors.enum';
import { AuthSignoutStatusEnum } from './auth-signout-status.enum';
import { AuthSaveProfileStatusEnum } from './auth-save-profile-status.enum';

export interface AuthBackendInterface {
  currentUser: EventEmitter<User>;
  signinError: EventEmitter<AuthSigninErrorsEnum>;
  signupError: EventEmitter<AuthSignupErrorsEnum>;
  signoutStatus: EventEmitter<AuthSignoutStatusEnum>;
  saveProfileStatus: EventEmitter<AuthSaveProfileStatusEnum>;

  signupUser(email: string, password: string): void;
  signinUser(email: string, password: string): void;
  signoutUser(): void;
  getCurrentUser(): User;
  updateUserProfile(displayName: string): void;
}