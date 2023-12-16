import { Injectable, OnInit } from '@angular/core';
import { DbService } from './db.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  user:any;
  status:any;
  users:any[]=[];

  constructor(private DbService:DbService) { }
  ngOnInit(): void {
    this.DbService.getUsers().subscribe((x)=>this.users=x);


      if(this.user){
        this.status=this.user.id;
      }
  }
  

  login(username:any,password:any){
    this.DbService.getUsers().subscribe((x)=>{
      let users:any[]=x;
      this.user=users.find((u)=>u.username==username && u.password==password);
      this.status=this.user.id;
      localStorage.setItem('status',this.status);
    });
    if(this.user){
     // localStorage.setItem('status','true');
     this.DbService.patchuser(this.status,{'status':true}).subscribe(x=> console.log(x));
      return this.status;
    }
    else{
      return this.status;
    }
    
  }
  logout(){
    // localStorage.setItem('status','false');
    this.DbService.patchuser(this.status,{'status':false}).subscribe(x=>console.log(x));
     localStorage.removeItem('status');
  }
  isLoggedIn():any{
   // localStorage.getItem('status');
   if(this.user){
    return this.status;
   }
   else{
    return false;
   }

  }
}
