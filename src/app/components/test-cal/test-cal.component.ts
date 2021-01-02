import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import * as range from 'lodash.range';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-test-cal',
  templateUrl: './test-cal.component.html',
  styleUrls: ['./test-cal.component.sass']
})
export class TestCalComponent implements OnInit {

  public currentDate: moment.Moment;
  public namesOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public weeks: Array<CalendarDate[]> = [];

  public selectedDate;
  public selectedEndWeek;
  public selectedStartWeek;
  public show: boolean;

  @ViewChild('calendar', { static: true }) calendar;
  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
    this.currentDate = moment();
    this.selectedDate = moment(this.currentDate).format('DD/MM/YYYY');
    this.generateCalendar();
  }

  private generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private fillDates(currentMoment: moment.Moment) {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const lastOfMonth = moment(currentMoment).endOf('month').day();
    
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const lastDayOfGrid = moment(currentMoment).endOf('month').subtract(lastOfMonth, 'days').add(7, 'days');
    const startCalendar = firstDayOfGrid.date();
    
    return range(startCalendar, startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days')).map((date) => {
      const newDate = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
      };
    });
  }

  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  public prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }
  
  public nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }
  
  public isDisabledMonth(currentDate): boolean {
    const today = moment();
    return moment(currentDate).isBefore(today, 'months');
  }
  
  public isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    return moment(date).isSame(this.currentDate, 'month') && moment(date).isSameOrBefore(today);
  }

  public selectDate(date: CalendarDate) {
    this.selectedDate = moment(date.mDate).format('DD/MM/YYYY');
    this.generateCalendar();
    this.show = !this.show;
  }

  private isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format('DD/MM/YYYY');
  }

  /*private isSelected(date: moment.Moment): boolean {
    return moment(date).isBefore(this.selectedEndWeek) && moment(date).isAfter(this.selectedStartWeek)
      || moment(date.format('YYYY-MM-DD')).isSame(this.selectedStartWeek.format('YYYY-MM-DD'))
      || moment(date.format('YYYY-MM-DD')).isSame(this.selectedEndWeek.format('YYYY-MM-DD'));
  }
  
  public isDayBeforeLastSat(date: moment.Moment): boolean {
    const lastSat = moment().weekday(-1);
    return moment(date).isSameOrBefore(lastSat);
    }
  }*/ 

}
