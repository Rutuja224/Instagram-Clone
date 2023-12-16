import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project';
  status:any;

  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.status=localStorage.getItem('status')
      
  }

}
