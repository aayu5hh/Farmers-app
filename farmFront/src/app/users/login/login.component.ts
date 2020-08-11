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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private r: Router, private formBuilder: FormBuilder, private reqService: BackendRequestService) {
    this.loginForm = formBuilder.group({
      'email': ['', Validators.required, Validators.email],
      'password': ['', Validators.required],
    })
   }

  ngOnInit(): void {
    console.log('inside login screen');
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.reqService.login(this.loginForm.value).subscribe(
      (resp) => { 
        console.log(resp);
        localStorage.setItem('token',resp['token']);

        this.r.navigate(['customers']);
      },
      (err) => console.log(err.error) )
  }

  goToSignUp(){
    this.r.navigate(['signup']);
  }

}
