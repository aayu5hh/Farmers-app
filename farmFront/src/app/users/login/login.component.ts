import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
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

  constructor(private r: Router, private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
   }

  ngOnInit(): void {
    console.log('inside login screen');
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (resp) => { 
        console.log(resp);
        localStorage.setItem('token',resp['token']);
        // navigate to protected route here
      },
      (err) => console.log(err.error) )
  }

}
