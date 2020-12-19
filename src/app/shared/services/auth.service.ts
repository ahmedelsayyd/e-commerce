import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>
  authService: any;

  constructor(private ngZone: NgZone,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute) {

    this.user$ = this.afAuth.authState;
  }

  login() {

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    //localStorage.setItem('returnUrl', returnUrl)

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(authData => {

        if (authData) {

          this.userService.save(authData.user)

          this.ngZone.run(() => {
            this.router.navigateByUrl(returnUrl)
          })
        }
      })
  }

  logout() {
    this.afAuth.auth.signOut()

  }


  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return of(null)
      })
    )
  }

}
