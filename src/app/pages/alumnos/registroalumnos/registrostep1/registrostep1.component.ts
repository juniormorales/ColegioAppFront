import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registrostep1',
  templateUrl: './registrostep1.component.html'
})
export class Registrostep1Component implements OnInit {

  @Input() alumnoForm: FormGroup;
  @Input() wizard;

  multiselect1: any = [];
  multiselect2: any = [];
  focus;
  focus1;
  focus2;
  focus3;
  focus4;//No tiene validator
  focus5;
  focus6;
  focus7;
  focusTouched;
  focus1Touched;
  focus2Touched;
  focus3Touched;
  focus5Touched;
  focus6Touched;

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  
  }

  get registerF() {
    return this.alumnoForm.controls;
  }

}
