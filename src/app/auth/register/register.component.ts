import { ConfirmationComponent } from './../confirmation/confirmation.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { passConfirmValidator } from '../../validors';
import { UserClass } from 'src/app/userClass';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMsg: string;
  user: UserClass = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private dialog: MatDialog, private renderer: Renderer2) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'))]],
      passwordch: ['', [Validators.required, passConfirmValidator]],
      checkboxTerms: ['', [Validators.required]],
      recaptchaReactive: ['', [Validators.required]],
    });

    this.registerForm.controls.password.valueChanges
    .subscribe(
      x => this.registerForm.controls.passwordch.updateValueAndValidity()
    );
   }

  ngOnInit(): void {
    /* recaptcha script*/
    const script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = 'https://www.google.com/recaptcha/api.js';
    this.renderer.appendChild(document.body, script);

  }

  onSubmit(): void {
    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;
    const email = this.registerForm.get('email')?.value;

    this.auth.signUp(username, password, email).subscribe(
      () => {
        console.log('Sign up successfully');
      },
      (error) => {
        console.log(error);
      }
    );

    this.auth.createUser(this.user).subscribe(
      data => {
        console.log('Adding into database');
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openConfirm(): void{
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = '500px';
    dialogconfig.data = {userConfirm: this.registerForm.get('username').value};
    this.dialog.open(ConfirmationComponent, dialogconfig);
  }


}
