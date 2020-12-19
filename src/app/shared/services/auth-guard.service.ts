import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authServic: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authServic.user$.pipe(
      map(user => {
        if (user) return true

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
        return false

      })
    )
  }
}
