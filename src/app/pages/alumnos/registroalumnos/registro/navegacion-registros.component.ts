import { Component, OnInit } from "@angular/core";
import Stepper from "bs-stepper";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-navegacion-registros",
  templateUrl: "navegacion-registros.component.html"
})
export class NavegacionRegistrosComponent implements OnInit {

  //Variables del componenten navegacion
  value = 15;
  private stepper: Stepper;
  checked = false;
  checked1 = false;
  checked2 = false;
  wizard = false;
  step = 1;

  //Variables del formulario
  multiselect: any = [];
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focusTouched;
  focus1Touched;
  focus2Touched;
  focus3Touched;
  ano_actual;

  public alumnoForm: FormGroup;
 
  constructor(public formBuilder: FormBuilder) {
    this.construirFormulario();
  }

  ngOnInit() {
    this.ano_actual = (new Date()).getFullYear();
    var wizard = document.getElementsByClassName("card-wizard")[0];
    wizard.classList.add("active");
    var stepper = document.getElementById("wizardProfile");

    this.stepper = new Stepper(stepper, {
      linear: false,
      animation: true
    });
  }

  construirFormulario(){
    this.alumnoForm = this.formBuilder.group({
      dni: ["",[Validators.required,Validators.max(99999999)]],
      nombres: ["", [Validators.required, Validators.minLength(1)]],
      apellidos: ["", [Validators.required, Validators.minLength(1)]],
      fecha_nac: ["",[Validators.required]],
      sexo: [[], [Validators.required]],
      phone: ["", [Validators.required]],
      select: [""]
    });
  }
  get registerF() {
    return this.alumnoForm.controls;
  }

  onRegister() {
    this.wizard = true;
    // stop here if form is invalid
    if (this.alumnoForm.invalid) {
      return;
    }
    this.stepper.next();
  }
  next() {
    if (this.alumnoForm.valid) {
      console.log("aici");
      if (this.value < 51) {
        this.step++;
        this.value += 35;
      }
      if (this.step === 1) {
        this.checked = true;
      } else if (this.step === 2) {
        this.checked1 = true;
      } else {
        this.checked2 = true;
      }
      this.stepper.next();
    }
  }
  previous() {
    this.stepper.previous();
    if (this.value > 15) {
      this.value -= 35;
      this.step--;
    }
  }
  addCheched(event) {
    event.target.classList.add("checked");
  }
}
