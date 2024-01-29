import { CanMatchFn, Router } from '@angular/router';
import windowStore from '../../../share/store/store';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, state) => {
  const isLoggedIn = windowStore.isLoggedIn();
  const router = inject(Router);
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
