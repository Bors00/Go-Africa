import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify';
/*import { fromPromise } from 'rxjs/observable/fromPromise'*/
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserClass } from '../userClass';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean>;
  private baseUrl = 'https://aefycafbk4.execute-api.us-east-1.amazonaws.com/production/';

  constructor(private router: Router, private http: HttpClient) {
    Amplify.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
   }

   /** Sign Up */
  public signUp(username, password, email): Observable<any> {
    return from(Auth.signUp(username, password, email));
  }

  /** confirm code */
  public confirmSignUp(username, code): Observable<any> {
    return from(Auth.confirmSignUp(username, code));
  }

  /** resend code */
  public resendConfirmationCode(username): Observable<any> {
    return from(Auth.resendSignUp(username));
}

  /** Add user into database */
 public createUser(user: UserClass): Observable <object>{
    return this.http.post(this.baseUrl + 'register', user);
  }

  /** signin */
  public signIn(username, password): Observable<any> {
    return from(Auth.signIn(username, password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  /** get authenticat state */
  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }

  /** signout */
  public signOut(): void {
    from(Auth.signOut())
      .subscribe(
        result => {
          this.loggedIn.next(false);
          // this.router.navigate(['/login']);
        },
        error => console.log(error)
      );
  }

}
