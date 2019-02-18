import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssService {

  constructor(private http: HttpClient) { 
  }

  getISSLocation(){
    return this.http.get('http://api.open-notify.org/iss-now.json');
  }

  getLocationByIp(){
    return this.http.get('https://ipapi.co/76.211.118.231/json/');
  }

  getPeopleInSpace(){
    return this.http.get("http://api.open-notify.org/astros.json");
  }
}
