import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
@Component({
  selector: "app-sweetalert",
  templateUrl: "sweetalert.component.html"
})
export class SweetalertComponent implements OnInit {
  constructor() {}
  showSwal(type) {
    if (type == "basic") {
      swal.fire({
        title: "Here's a message!",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success"
      });
    } else if (type == "title-and-text") {
      swal.fire({
        title: "Here's a message!",
        text: "It's pretty, isn't it?",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info"
      });
    } else if (type == "success-message") {
      swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success"
      });
    } else if (type == "warning-message-and-confirmation") {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn btn-danger",
          confirmButtonClass: "btn btn-success mr-1",
          confirmButtonText: "Yes, delete it!",
          buttonsStyling: false
        })
        .then(result => {
          if (result.value) {
            swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              type: "success",
              confirmButtonClass: "btn btn-success",
              buttonsStyling: false
            });
          }
        });
    } else if (type == "warning-message-and-cancel") {
      swal
        .fire({
          title: "Are you sure?",
          text: "You will not be able to recover this imaginary file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it",
          confirmButtonClass: "btn btn-success mr-1",
          cancelButtonClass: "btn btn-danger",
          buttonsStyling: false
        })
        .then(result => {
          if (result.value) {
            swal.fire({
              title: "Deleted!",
              text: "Your imaginary file has been deleted.",
              type: "success",
              confirmButtonClass: "btn btn-success",
              buttonsStyling: false
            });
          } else {
            swal.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              type: "error",
              confirmButtonClass: "btn btn-info",
              buttonsStyling: false
            });
          }
        });
    } else if (type == "custom-html") {
      swal.fire({
        title: "HTML example",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success mr-1",
        html:
          "You can use <b>bold text</b>, " +
          '<a href="https://github.com">links</a> ' +
          "and other HTML tags"
      });
    } else if (type == "auto-close") {
      swal.fire({
        title: "Auto close alert!",
        text: "I will close in 2 seconds.",
        timer: 2000,
        showConfirmButton: false
      });
    } else if (type == "input-field") {
      swal
        .fire({
          title: "Input something",
          html:
            '<div class="form-group">' +
            '<input id="input-field" type="text" class="form-control" />' +
            "</div>",
          showCancelButton: true,
          confirmButtonClass: "btn btn-success mr-1",
          cancelButtonClass: "btn btn-danger",
          buttonsStyling: false
        })
        .then(function(result) {
          swal.fire({
            type: "success",
            html:
              "You entered: <strong>" +
              (document.getElementById("input-field") as HTMLInputElement)
                .value +
              "</strong>",
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
          });
        });
    }
  }
  ngOnInit() {}
}
