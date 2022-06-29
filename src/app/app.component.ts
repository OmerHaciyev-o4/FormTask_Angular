import { Component, OnInit } from '@angular/core';
import { Reserv } from './models/reserv';
import { ReservService } from './services/reserve.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ReservService]
})
export class AppComponent implements OnInit {
  title = 'Form Task Angular';
  dates: string[] = [];
  times: string[] = [];
  reservs: Reserv[];
  model: any = {
    name: "",
    mail: "",
    phone: "",
    note: "",
    people : "2",
    smoking : false
  };

  constructor(private reservService: ReservService){}

  ngOnInit(): void {
    this.setDate(5);
    this.setTime();

    this.reservService.getReserv().subscribe(data => {
      this.reservs = data;
    });
  }

  changeUI(list:any, btn: any){
    for (let i = 0; i < list.children.length; i++) {
      const element = list.children[i];
      element.classList.remove("active");
    }
    btn.classList.add("active");
    var iconTag = btn.children[0];
    var splitedClassList = iconTag.className.split(' ');

    if (splitedClassList[1] == "fa-smoking-ban") {
      this.model.smoking = false;
    }
    else if (splitedClassList[1] == "fa-smoking") {
      this.model.smoking = true;      
    }
  }

  dateChange(value:string){
    this.model.date = value;
    this.setTime(value);
  }

  reservOrder(){
    this.reservService.createReserv(this.model).subscribe(data => {console.log(data);});
  }

  peopleCountChange(value: string){
    this.model.people = value;
  }

  private setTime(dateStr?: string) {
    this.times = [];
    if (!dateStr || this.dates[0] == this.model.date) {
      var date = new Date();
      var startCount = 24 - date.getHours();
      for (let i = 1; i < startCount + 1; i++){
        date.setHours(date.getHours() + 1);
        if (date.getHours() == 0) {
          this.times.push("00:00");
        }
        else if(date.getHours() > 0 && date.getHours() < 10){
          this.times.push("0" + date.getHours() + ":00");
        }
        else if(date.getHours() > 9){
          this.times.push(date.getHours() + ":00");
        }
      }
    }
    else if(this.dates[0] != this.model.date){
      this.times.push("00:00");
      for (let i = 0; i < 24; i++) {
        if (i > 0 && i < 10) {
          this.times.push("0" + i + ":00");
        }
        else if(i > 9){
          this.times.push(i + ":00");
        }      
      }
    }  
    this.model.time = this.times[0];  
  }

  private setDate(count: number){
    var splitedDate: string[] = [];
    var date = new Date();
    for (let i = 0; i < count; i++) {
      date.setDate(date.getDate() + i);
      splitedDate = date.toDateString().split(' ');
      this.dates.push(splitedDate[2] + ". " + splitedDate[1] + " " + splitedDate[3]);
      if (i == 0) {
        this.model.date = splitedDate[2] + ". " + splitedDate[1] + " " + splitedDate[3];
      }
      splitedDate = [];
      date = new Date();
    }
  }
}