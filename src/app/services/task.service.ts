import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './setService'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  createTask(task_to_create) {
    let params = JSON.stringify(task_to_create);

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'/task/new', params, {headers: headers});
  }

  getList(): Observable<any> {
    return this._http.get(this.url+'/task/list');
  }

  updateTask(task_to_update, value) {
    let params = JSON.stringify({
      check: value
    });
    console.log(params);
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put(`${this.url}/task/update/${task_to_update}`,params,{ headers: headers });
  }

}
