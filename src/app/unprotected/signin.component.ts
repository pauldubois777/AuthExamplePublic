import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';
import { User } from '../shared/user';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit, OnDestroy {
    myForm: FormGroup;
    signinStatus = '';
    private redirectUrl: string = '';
    private currentUserSubscription: Subscription;
    private errorMessageSubscription: Subscription;
    private queryParamsSubscription: Subscription;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    onSignin() {
        this.authService.signinUser(this.myForm.controls['email'].value, this.myForm.controls['password'].value);
        this.signinStatus = 'Signing in...';
    }

    onSignUp() {
        this.router.navigate(['/user/signup']);
    }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
            (queryParam: any) => this.redirectUrl = queryParam['redirectUrl'] || ''
        );

        this.currentUserSubscription = this.authService.currentUser.subscribe(
            (user: User) => {
                if (user != null) {
                    this.router.navigate([this.redirectUrl]);
                } else {
                    // Nothing really needed here?
                }
            }
        );

        this.errorMessageSubscription = this.authService.errorMessage.subscribe(
            (errorMessage: string) => { this.signinStatus = errorMessage; }
        );
    }

    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
        this.errorMessageSubscription.unsubscribe();
        this.queryParamsSubscription.unsubscribe();
    }
}
