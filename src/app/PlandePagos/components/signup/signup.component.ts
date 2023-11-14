import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import {SignupService} from "../../../services/signup-service/signup.service";
import {SignupData} from "../../../shared/interfaces/signupdata";

function customPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    if (control.value.length < 8) {
      return { passwordLength: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  studentForm: FormGroup;
  signupData: SignupData;
  dataSource: MatTableDataSource<any>;

  constructor(public service: SignupService, private router: Router, private builder: FormBuilder) {
    this.signupData = {} as SignupData;
    this.dataSource = new MatTableDataSource<any>();
    this.studentForm = this.builder.group({
      firstName: ['', [Validators.required, Validators.maxLength(60)]],
      lastName: ['', [Validators.required, Validators.maxLength(60)]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required]],
      password: ['', [Validators.required, customPasswordValidator()]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  isEditStudent: boolean | undefined;

  get firstName() { return this.studentForm.controls['firstName'] }
  get lastName() { return this.studentForm.controls['lastName'] }
  get phone() { return this.studentForm.controls['phone'] }
  get email() { return this.studentForm.controls['email'] }
  get dni() { return this.studentForm.controls['dni'] }
  get password() { return this.studentForm.controls['password'] }
  get confirmPassword() { return this.studentForm.controls['confirmPassword'] }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log('valid');
      this.cancelStudent();
    } else {
      console.log('Invalid data');
    }
  }

  cancelStudent() {
    this.isEditStudent = false;
    this.studentForm.reset();
  }

  addStudent() {
    if (this.firstName.hasError('required') || this.lastName.hasError('required')
      || this.phone.hasError('required') || this.email.hasError('required')
      || this.dni.hasError('required') || this.password.hasError('required')
      || this.confirmPassword.hasError('required')) {
      console.log('there is value required');
      return;
    } else {
      console.log('data sent');
    }

    this.signupData.id = 0;
    this.service.createStudent(this.signupData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; })
    })
  }
}
