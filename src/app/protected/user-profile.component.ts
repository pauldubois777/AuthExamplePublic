import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Rx";

import { AuthService } from "../auth/auth.service";
import { User } from "../shared/user";

@Component({
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  saveProfileMessage: string = '';
  private saveProfileMessageSubscription: Subscription;
  
  constructor(private fb: FormBuilder, private authService: AuthService) { 

  }

  onSaveProfile(){
    this.authService.updateUserProfile(this.myForm.controls['displayName'].value);
    this.saveProfileMessage = "Saving Profile...";
  }

  ngOnInit() {
    let user = this.authService.getCurrentUser();

    this.myForm = this.fb.group({
      displayName: [user.displayName || '', Validators.maxLength(20)]
    });

    this.saveProfileMessageSubscription = this.authService.saveProfileMessage.subscribe(
        (saveProfileMessage: string) => {this.saveProfileMessage = saveProfileMessage}
    );
  }

  ngOnDestroy() {
    this.saveProfileMessageSubscription.unsubscribe();
  }  

}
