import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionalumnosComponent } from './gestionalumnos.component';

describe('GestionalumnosComponent', () => {
  let component: GestionalumnosComponent;
  let fixture: ComponentFixture<GestionalumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionalumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionalumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
