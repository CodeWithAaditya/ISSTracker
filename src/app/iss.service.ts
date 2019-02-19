import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssService {
  public baseUrl = 'https://isstracker.azurewebsites.net/api/iss/';
  constructor(private http: HttpClient) { 
  }

  getISSLocation(){
    return this.http.get(this.baseUrl + 'now');
  }

  getLocationByIp(ip:string){
    return this.http.get(`https://ipapi.co/${ip}/json/`);
  }

  getPeopleInSpace(){
    return this.http.get(this.baseUrl + 'astros');
  }

  getPassTimes(latOfClient: number, lngOfClient: number){
    return this.http.get(`${this.baseUrl}pass?lat=${latOfClient}&lon=${lngOfClient}`);
  }

  getIP(){
    return this.http.get('https://api.ipify.org?format=json');
  }
}
