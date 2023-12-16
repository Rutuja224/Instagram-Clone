import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DbService } from '../db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth:AuthService,private router:Router,private DbService:DbService,private route:ActivatedRoute) {
    
  }
  @Input() user:any={}
  users:any[]=[]
  uid:any;
  ngOnInit(): void {
    this.uid= this.route.snapshot.params['userid'];
    // this.DbService.getUsers().subscribe((x)=>{
    //   let users:any[]=x;
    //   let id=this.route.snapshot.params['userid']
    //   this.user=users.find((u)=>u.id==id);
    // });
    this.DbService.getdata().subscribe((x)=>{
    let users:any[]=x
    this.users = users.filter(x=> x.user == this.uid)
    })
}
  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  goToFriends(){
    this.router.navigateByUrl('/friends/'+this.uid);
    
  }

}
