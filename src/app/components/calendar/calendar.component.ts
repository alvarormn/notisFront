import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  public date;

  public display;


constructor() {
  this.date = moment();
  }

  ngOnInit(): void {
    moment.locale('es'); 

    this.getWeek(this.date);    
    //console.log(this.date);
    

    this.display = {
      year: this.date.format('YYYY'),
      month: this.date.format('MMMM'),
      week: this.date.format('dd'),
      day: this.date.format('DD')
    }
    //console.log(this.display);
    
    
    

  };

  nextYear() {
    this.date.add(1, 'year');
    
    this.display.year = this.date.format('YYYY');
    
  }

  prevYear() {
    this.date.subtract(1, 'year');;
    
    this.display.year = this.date.format('YYYY');
    
  }

  nextMonth() {
    this.date.add(1, 'months');

    this.display.month = this.date.format('MMMM')
    
  }
  prevMonth() {
    this.date.subtract(1, 'months');

    this.display.month = this.date.format('MMMM')
  }

  private getWeek(date) {
    //console.log(date.format('D'));
    let week = date.weekday(0);
    console.log(week);
    
    
    
  }

  


};
