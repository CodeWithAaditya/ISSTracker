import { Component } from '@angular/core';
import { IssService } from './iss.service';
import { ISSLocation } from './location.model';
import { People } from './people.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loc: ISSLocation;
  locationHistory: ISSLocation[];
  people: People;
  passTime: string;
  yourLoc: ISSLocation;
  constructor(private issService: IssService) {
    this.locationHistory = [];
    this.loc = new ISSLocation();
    this.yourLoc = new ISSLocation();
    this.people = new People();
  }

  ngOnInit() {
    this.drawLine10Times();
    this.peopleInSpace();
    this.getClientLocation();
  }

  drawLine10Times(){
    this.populateLocation();
    let counter = 0;
    let intervalID = setInterval(() => {
      this.populateLocation();
      if (++counter === 100) {
        clearInterval(intervalID);
      }
    }, 10000);
  }

  refresh(){
    this.drawLine10Times();
  }

  populateLocation() {
    this.issService.getISSLocation().subscribe((data: any) => {
      console.log(data);
      this.loc.lat = +data.iss_position.latitude;
      this.loc.lng = +data.iss_position.longitude;
      this.loc.time = new Date(data.timestamp * 1000).toString();
      let tempLocation = new ISSLocation();
      tempLocation.lat = this.loc.lat;
      tempLocation.lng = this.loc.lng;
      this.locationHistory.push(tempLocation);
      console.log(this.locationHistory);
    });
  }

  peopleInSpace() {
    this.issService.getPeopleInSpace().subscribe((data: any) => {
      console.log(data);
      this.people.numberOfPeople = data.number;
      for (let index = 0; index < this.people.numberOfPeople; index++) {
        this.people.names.push(data.people[index].name);
      }
      console.log(this.people);
    });
  }

  passTimes(lat:number, lon:number) {
    this.issService.getPassTimes(35.73, -78.83).subscribe((data: any) => {
      this.yourLoc.lat = lat;
      this.yourLoc.lng = lon;
      this.yourLoc.time = new Date(data.response[0].risetime * 1000).toString();
      console.log(new Date(data.response[0].risetime * 1000));
    });
  }

  getClientLocation(){
    this.issService.getIP().subscribe((data:any)=>{
      this.issService.getLocationByIp(data.ip).subscribe((result:any)=>{
        console.log(result);
        this.passTimes(result.latitude, result.longitude);
      })
    })
  }
}
