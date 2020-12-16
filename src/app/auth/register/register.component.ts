import { ConfirmationComponent } from './../confirmation/confirmation.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { passConfirmValidator } from '../../validors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMsg: string;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private dialog: MatDialog) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'))]],
      passwordch: ['', [Validators.required, passConfirmValidator]],
    });

    this.registerForm.controls.password.valueChanges
    .subscribe(
      x => this.registerForm.controls.passwordch.updateValueAndValidity()
    );
   }

  ngOnInit(): void {

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
