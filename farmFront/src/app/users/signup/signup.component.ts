import { Component, OnInit } from '@angular/core';
import { BackendRequestService } from '../../service/backendRequest.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm: FormGroup;

  roles = ['Customer', 'Farmer'];
  

  constructor(private r: Router, private formBuilder: FormBuilder, private reqService: BackendRequestService) {

    this.signupForm = formBuilder.group({
      'first_name': ["", [Validators.required]],
      'last_name': ["",[Validators.required]],
      'email': ["", [Validators.required, Validators.email]],
      'password': ["", [Validators.required]],
      'address':["",[Validators.required]],
      'role': ['Customer']

    });
   }

  ngOnInit(){
    console.log('inside signup Component');
  }
  showMsg:boolean=false
  errMsg:boolean=false
  respMsg;
  onSubmit() {
    console.log(this.signupForm.value);
    this.reqService.signUp(this.signupForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.errMsg= resp['message'];
      },
      (err) => {
        console.log(err);
        this.errMsg = true;
      }
    )
  }

  goToLogin() {
    this.r.navigate(['login']);
  }

}
