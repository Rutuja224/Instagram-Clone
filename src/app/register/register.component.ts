import { Component ,OnInit} from '@angular/core';
import { DbService } from '../db.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  user:any={}
  users:any[]=[];
  constructor(private DbService:DbService) {
    
  }
  ngOnInit(): void {
      this.DbService.getUsers().subscribe((x)=>this.users=x);
  }
  mydata(){
    this.DbService.postUser(this.user).subscribe((x)=>this.ngOnInit())
    this.user={}
  }


}
