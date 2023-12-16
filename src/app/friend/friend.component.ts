import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent implements OnInit{
  name:any;
  username:any;
  email:any;
  image:any="";
  user:any={};
  myusers:any[]=[];
  searchItem:string='';
  filteredUsers:any[]=[]
  
  u:any;
  toggle:boolean=true;

  constructor(private DbService:DbService){

  }

  ngOnInit(): void {
    this.DbService.getUsers().subscribe((x)=>this.myusers=x);

  }

  handleprofilePic(event:any){
    let post=event?.target.files[0];
    const reader=new FileReader();

    reader.onload=(e)=>{
      if(e.target){
        this.image=e.target.result;
      };
    }
    reader.readAsDataURL(post);
  }

  mydata(){
  let a={image:this.image,name:this.name}
  this.DbService.postfriend(a).subscribe((x)=>this.ngOnInit())
  this.image=undefined;
  this.name=undefined;
  

  }
  follow(){
    this.toggle=!this.toggle;

  }

  search(){


if(this.myusers)
    this.myusers=this.myusers.filter((u:any)=>u.username.includes(this.searchItem))
  
  }
  // delete(id:any){
  //   this.DbService.deletefriend(id).subscribe((x)=>this.ngOnInit())

  // }
  

}
