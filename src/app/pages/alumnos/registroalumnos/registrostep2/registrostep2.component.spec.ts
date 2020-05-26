import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrostep2Component } from './registrostep2.component';

describe('Registrostep2Component', () => {
  let component: Registrostep2Component;
  let fixture: ComponentFixture<Registrostep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registrostep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registrostep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
