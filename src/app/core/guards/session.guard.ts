import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard {

  constructor(
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUser();
  }

  checkUser(): boolean {
    try {
      const user: string | null = localStorage.getItem('user');
      if (!user) {
        this.router.navigate(['/', 'auth']);
      }
      return true;

    } catch (error) {
      console.log('ERROR', error);
      return false;
    }

  }

}
