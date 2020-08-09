import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  signupForm: FormGroup;

  roles = ['Customer', 'Farmer'];

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    this.signupForm = formBuilder.group({
      'firstName': ["", [Validators.required]],
      'lastName': [""],
      'email': ["", [Validators.required, Validators.email]],
      'password': ["", [Validators.required]],
      'role': ['Customer']

    });
   }

  onSubmit() {
    console.log(this.signupForm.value);
    this.userService.signUp(this.signupForm.value).subscribe(resp => {
      console.log(resp);
    })
  }

}
