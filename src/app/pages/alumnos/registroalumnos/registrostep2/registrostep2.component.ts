import { Component, OnInit, Input, ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrostep2',
  templateUrl: './registrostep2.component.html',
  styleUrls: ['./registrostep2.component.scss']
})
export class Registrostep2Component implements OnInit {

  avatar: boolean = false;
  image: string;

  file: File;
  @Output() fileEvent: EventEmitter<File> = new EventEmitter<File>();
  imagePreviewUrl: any = {};
  @ViewChild("fileInput") fileInput: ElementRef;
  constructor() {
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  ngOnInit() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
        ? "assets/img/placeholder.jpg"
        : "assets/img/image_placeholder.jpg";
  }

  handleImageChange(event) {
    if(event.target.files.length>0){
      event.preventDefault();
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.file = file;
        this.imagePreviewUrl = reader.result;
        // this.state.imagePreviewUrl1 = reader.result;
      };
      reader.readAsDataURL(file);
      this.fileEvent.emit(file);
    }
  }
  handleClick() {
    this.fileInput.nativeElement.click();
  }
  handleRemove() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
          ? "assets/img/placeholder.jpg"
          : "assets/img/image_placeholder.jpg";
    this.fileInput.nativeElement.value = null;
  }
}
