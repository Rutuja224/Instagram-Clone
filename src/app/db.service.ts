import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private user='http://localhost:3000/users';
  private post='http://localhost:3000/posts';
  private friend='http://localhost:3000/friends';

  constructor(private http:HttpClient) { }

  getdata():Observable<any>{
    return this.http.get<any>(this.post);
  }
  postdata(data:any):Observable<any>{
    return this.http.post<any>(this.post,data);

  }
  getUsers():Observable<any>{
    return this.http.get<any>(this.user);
  }
  postUser(data:any):Observable<any>{
    return this.http.post<any>(this.user,data);

  }

  getfriend():Observable<any>{
    return this.http.get<any>(this.friend);
  }
  postfriend(data:any):Observable<any>{
    return this.http.post<any>(this.friend,data);
  }
  // deletefriend(id:any):Observable<any>{
  //   return this.http.delete<any>(this.friend+'/'+id)
  // }

  patchuser(id:any,data:any){
    return this.http.patch<any>(this.user+'/'+id,data)
  }
  patchdata(id:any,data:any){
    return this.http.patch<any>(this.post+'/'+id,data);
  }
  deletedata(id:any):Observable<any>{
    return this.http.delete<any>(this.post+'/'+id)
  }
}
