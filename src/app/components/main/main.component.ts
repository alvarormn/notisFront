import { Component, OnInit } from '@angular/core';
import { getMaxListeners } from 'process';

import { Task } from '../../models/task/task.model';
import { TaskService } from '../../services/task.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
  providers: [
    TaskService
  ]
})
export class MainComponent implements OnInit {

  public task: Task;
  public taskList;
  public resourcesLoaded = false;
  public disabled = false;
  public state: Boolean;
  public date: Date;

  constructor(
    private _taskService:TaskService
  ) {
    this.task = new Task('','','',false,null);
  }

  ngOnInit(): void {
    this.getListTask();
  }

  getListTask() {
    this._taskService.getList().subscribe(
      result => {
        
        this.taskList = result.list;
      },
      error => {
        console.log(error);
      }
    )
  }

  update(taskID, valueCB) {
    this.resourcesLoaded = true;
    this.disabled = true;
    
    this._taskService.updateTask(taskID,valueCB).subscribe(
      result => {
        //console.log(result);
        this.resourcesLoaded = false;
        this.disabled = false;
      },
      error => {
        console.log(error);
        
      }
    )
    
  }

  delete(item) {
    this._taskService.deleteTask(item).subscribe(
      result => {
        this.getListTask();
      },
      error => {
        console.error(error);
        
      }
    )
  }

  onSubmit() {
    let milisecond = new Date();
    this.task.date = milisecond.getTime();
   
    this._taskService.createTask(this.task).subscribe(
      result => {
        this.task = new Task('', '', '', false,null);
        this.getListTask();
      },
      error => {
        console.log(error);
      }
    )
    
  }

}
