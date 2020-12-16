import { NumberInput } from '@angular/cdk/coercion';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  confirmationForm: FormGroup;
  confirmationCode: any;
  @Input() public codeConfirm;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {userConfirm: string}) {

  }

  ngOnInit(): void {
    console.log(this.codeConfirm);
  }

  onSubmitConfirmation(): void {
    const username = this.data.userConfirm;
    this.auth.confirmSignUp(username, this.confirmationCode).subscribe(
      () => {
        this.router.navigate(['/login']);
        console.log('Confirmation successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onResendCode(): void{
    const username = this.data.userConfirm;
    this.auth.resendConfirmationCode(username).subscribe(
      () => {
        console.log('code resent successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
