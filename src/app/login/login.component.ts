import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  user:any={}
  users:any[]=[];
  status:any=false;
  constructor(private auth:AuthService,private router:Router){

  }
  ngOnInit(): void {
      
  }
  login(){
    this.status=this.auth.login(this.user.username,this.user.password);
    if(this.status){
      alert("Login Successfully");
      this.router.navigateByUrl("/dashboard/"+ this.status);
    }
  }


}
