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

  constructor(private issService: IssService) {
    this.locationHistory = [];
    this.loc = new ISSLocation();
    this.populateLocation();
    this.people = new People();
  }

  ngOnInit() {
    let counter = 0;
    let intervalID = setInterval(() => {
      this.populateLocation();
      if (++counter === 10) {
        clearInterval(intervalID);
    }
    }, 100000);

    this.peopleInSpace();

    // this.issService.getLocationByIp().subscribe((data:any) => {
    //   console.log(data);
    //   this.lat = data.latitude;
    //   this.lng = data.longitude;

    //   console.log(this.lat);
    //   console.log(this.lng);
    // })
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

  peopleInSpace(){
    this.issService.getPeopleInSpace().subscribe((data: any) => {
      console.log(data);
      this.people.numberOfPeople = data.number;
      for (let index = 0; index < this.people.numberOfPeople; index++) {        
        this.people.names.push(data.people[index].name);
      }
      console.log(this.people);
    });  
  }
}
