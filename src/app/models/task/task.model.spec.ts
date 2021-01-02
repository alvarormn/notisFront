import { stringify } from '@angular/compiler/src/util';
import { Task } from './task.model';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task(_id: String, title: String,body: string,check:boolean)).toBeTruthy();
  });
});
