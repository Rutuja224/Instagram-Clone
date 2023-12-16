import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  myusers:any[]
  users: any[];
  filteredUsers: any[];
  username: any;
  id: any;
  myuser:any;
  myfriends:any[]=[];
  image:any;
  
  constructor(private DbService: DbService,private route:ActivatedRoute) {}


  ngOnInit(): void {
    this.DbService.getUsers().subscribe(x => {
      this.myusers=x;
      this.users = x.map((user:any) => ({ ...user, toggle: true })); // Add 'toggle' property to each user
      this.filteredUsers = [...this.users];
      // this.filteredUsers =this.users.filter(x=>!x.username.includes(this.myuser.friends))
      let userId  = this.route.snapshot.params['userid'];
      this.myuser = this.users.find(x=> x.id == userId);
      let friends = this.myuser.friends;
      this.myfriends = this.users.map(x=> x.username);

      this.filteredUsers = this.filteredUsers.filter(x=> !friends.includes(x.username))

    });
  }

  findUser() {
    this.filteredUsers = this.users.filter(x => x.username.includes(this.username));
  }

  follow(i: any, id: string) {
    let friend = this.users.find(x => x.id == id);
    
    let x=this.myuser.friends;
    if(x == null)
    {
      x=[];
      x.push(friend.id);
    }
    else{
      // if(!x.includes(friend.id))

      x.push(friend.id);
    }
    this.DbService.patchuser(this.myuser.id,{friends:x}).subscribe(x=>this.ngOnInit())
    // alert(friend.name)
    friend.toggle = !friend.toggle; // Toggle the 'toggle' property for the specific user
  }
  checkUser(y:any){
    let x = this.myuser.friends;
    if(x.includes(y)){
      return true;
    }
    else{
      return false;
    }
  }

  findByUser(user:any){
    return this.myusers.find(x=>x.id == user)

   }

  cancel(){
    // this.username= undefined;
  }
   
}
