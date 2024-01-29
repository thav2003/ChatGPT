import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  constructor(private router: Router) {}

  navigate(path: string): void {
    if(path === "/"){
      this.router.navigate([path]);
    }
    else if ( this.router.url.startsWith('/auth')) {
      this.router.navigate(['/auth'+path]);
    } else {
      this.router.navigate([path]);
    }
  }
}
