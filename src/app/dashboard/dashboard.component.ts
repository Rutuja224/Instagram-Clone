import { Component , OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DbService } from '../db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user:any={}
  users:any[]=[]
  myusers:any[]=[]
  name:any;
  location:any;
  image:any;
  image1:any;
  caption:any;
  trisha:boolean=true;
  heartColor:any;
  heart:boolean = false;
  uid:any;
  myuser:any;

  constructor(private auth:AuthService,private router:Router,private DbService:DbService,private route:ActivatedRoute){}


  // findLike(id:any){
  //   return (this.users.find(x=> x.id==id)?.likes).includes(this.uid);
  // }
  ngOnInit(): void {
    this.uid= this.route.snapshot.params['userid'];

    this.DbService.getUsers().subscribe((x)=>{
      let users:any[]=x;
      this.myusers =x;
      let id=this.route.snapshot.params['userid']
      this.user=users.find((u)=>u.id==id);
      // this.myuser = this.users.find(x=> x.id ==id);
      // let like=this.myuser.likes;

      //filter:
      this.DbService.getdata().subscribe((x:any[])=>{
        let users:any[]=x;
        let f=this.user.friends;
        // alert(f)
        let a = users.filter(x=> x.user == this.uid || f.includes(parseInt(x.user)) );
        
        this.users =a;
        
        })
    
    }); 
}

findByUser(user:any){
 return this.myusers.find(x=>x.id == user)
}

showLike(){
  return true;
}

change(i:any,id:any){
  let like = this.users.find(x => x.id == id);
     let x=like.likes;
     let y:any[]=[]
    for(let i of x){
      y.push(i);
    }


     
     let heart;
      if(x == null)
    {
      x=[];
      x.push(this.user.id);
    }
    else{
      if(!x.includes(this.user.id)){
      x.push(this.user.id);
      }
      
      
    }
    this.DbService.patchdata(id,{likes:x}).subscribe(x=>this.ngOnInit())
    like.heart= !like.heart;
  }

  mydata(){
    // alert(id)
    let a={user:this.uid,name:this.user.name,image:this.user.dp,image1:this.image1,location:this.location,caption:this.caption}
    this.DbService.postdata(a).subscribe((x)=>this.ngOnInit())
    this.name=undefined;
    this.image=undefined;
    this.image1=undefined;
    this.location=undefined;
    this.caption=undefined
  }

  deleteUser(id:any){
    this.DbService.deletedata(id).subscribe((x)=>this.ngOnInit())
  }

  handleprofilePic(event:any){
    let post=event.target.files[0];
    const reader=new FileReader();

    reader.onload=(e)=>{
      if(e.target){
        this.image=e.target.result;
      };
    }
    reader.readAsDataURL(post);
  }

  handlepost(event:any){
    let post=event.target.files[0];
    const reader=new FileReader();

    reader.onload=(e)=>{
      if(e.target){
        this.image1=e.target.result;
      };
    }
    reader.readAsDataURL(post);
  }

}




  
  
  
  

  
 

 
  


