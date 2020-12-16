import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: string;
  password: string;

  hide = true;
  errorMsg: string;


  showRecoverForm(): void {
    /*this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;*/
  }

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    });
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.auth.signIn(username, password).subscribe(
      () => {
        /*this.router.navigate(['/home']);*/
        console.log('Welcome Home');
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
