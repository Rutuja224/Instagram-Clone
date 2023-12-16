import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  if(localStorage.getItem('status') ==route.params['userid']){
    return true;
  }
  else{
    let router=new Router();
    router.navigateByUrl('/login')
    return false;
  }
  
};
