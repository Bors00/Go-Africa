import { Component, OnInit, Renderer2 } from '@angular/core';
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
  /*loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    recaptchaReactive: new FormControl('', Validators.required)
  });*/

  isValidate = false;
  hide = true;
  errorMsg: string;
  password: string;


  showRecoverForm(): void {
    /*this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;*/
  }

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptchaReactive: ['', Validators.required]
    });

    /* recaptcha script*/
    const script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = 'https://www.google.com/recaptcha/api.js';
    this.renderer.appendChild(document.body, script);
  }

  resolved(token): void {
    console.log(token);
  }

  onSubmit(): void {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.auth.signIn(username, password).subscribe(
      () => {
        /*this.router.navigate(['/home']);*/
        console.log('Welcome Home');
        console.log(username);
      },
      (error) => {
        console.log(error);
        console.log(username);
      }
    );
  }


}
