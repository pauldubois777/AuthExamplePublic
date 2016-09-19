import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';
import { User } from '../shared/user';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
    myForm: FormGroup;
    signupStatus: string = '';
    private currentUserSubscription: Subscription;
    private errorMessageSubscription: Subscription;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router) {
    }

    onSignup() {
        this.authService.signupUser(this.myForm.controls['email'].value, this.myForm.controls['password'].value);
        this.signupStatus = 'Signing up...';
    }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
        });

        this.currentUserSubscription = this.authService.currentUser.subscribe(
            (user: User) => {
                if (user != null) {
                    this.router.navigate(['/user/profile']); // Let new user setup their profile
                } else {
                    this.signupStatus = 'Unknown error occurred while signing up.  Please try again';
                }
            }
        );

        this.errorMessageSubscription = this.authService.errorMessage.subscribe(
            (errorMessage: string) => { this.signupStatus = errorMessage; }
        );
    }

    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
        this.errorMessageSubscription.unsubscribe();
    }

    isEmail(control: FormControl): {[s: string]: boolean} {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return {noEmail: true};
        }
    }

    isEqualPassword(control: FormControl): {[s: string]: boolean} {
        if (!this.myForm) {
            return {passwordsNotMatch: true};

        }
        if (control.value !== this.myForm.controls['password'].value) {
            return {passwordsNotMatch: true};
        }
    }
}
