import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private userService: UserService) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    const token = localStorage['token'];
    const tokenPayload = decode<any>(token);
    this.userService.getVisitor(route.params['id'] as number);

    if (route.params['id'] as number !== tokenPayload.id) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
