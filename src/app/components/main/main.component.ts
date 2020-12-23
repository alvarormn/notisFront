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

  constructor(
    private _taskService:TaskService
  ) {
    this.task = new Task('','','',false);
  }

  ngOnInit(): void {

    this._taskService.getList().subscribe(
      result => {
        
        this.taskList = result.list;
        console.log(this.taskList);
      },
      error => {
        console.log(error);
      }
    )

  }

  update(taskID, valueCB) {
    this.resourcesLoaded = true;
    this.disabled = true;
    console.log(valueCB);
    
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

  onSubmit() {
    this._taskService.createTask(this.task).subscribe(
      result => {
        console.log(result);
        this.task = new Task('','','',false);
      },
      error => {
        console.log(error);
      }
    )
    
  }

  //borrar
  check() {
    console.log(this.state);
    
  }

}
