import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    Amplify.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
   }

   /** Sign Up */
  public signUp(username, password, email): Observable<any> {
    return fromPromise(Auth.signUp(username, password, email));
  }

  /** confirm code */
  public confirmSignUp(username, code): Observable<any> {
    return fromPromise(Auth.confirmSignUp(username, code));
  }

  /** resend code */
  public resendConfirmationCode(username): Observable<any> {
    return fromPromise(Auth.resendSignUp(username));
    /*try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }*/
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
