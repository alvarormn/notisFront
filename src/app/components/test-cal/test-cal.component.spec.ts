import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCalComponent } from './test-cal.component';

describe('TestCalComponent', () => {
  let component: TestCalComponent;
  let fixture: ComponentFixture<TestCalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
