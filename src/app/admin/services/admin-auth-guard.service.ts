import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate() {
    return this.authService.appUser$.pipe(
      map(user => user.isAdmin))
  }
}
