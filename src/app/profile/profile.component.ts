import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { ActivatedRoute } from '@angular/router';

// import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  image:any;
  users:any[]=[];
  user:any={};
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private DbService:DbService, private route:ActivatedRoute) {
    
  }
  ngOnInit(): void {
      this.DbService.getUsers().subscribe((x)=>{
        let users:any[]=x;
        let id=this.route.snapshot.params['userid']
        this.user=users.find((u)=>u.id==id);
      });
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
    // alert(id)
    this.user['dp']=this.image;
    let id=this.route.snapshot.params['userid'];
    this.DbService.patchuser(id,this.user).subscribe((x)=>this.ngOnInit())
    alert("updated");
    

    
  }
  

}
