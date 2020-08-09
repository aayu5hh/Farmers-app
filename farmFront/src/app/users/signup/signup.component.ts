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
export class SignupComponent implements OnInit{

  signupForm: FormGroup;

  roles = ['Customer', 'Farmer'];

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    this.signupForm = formBuilder.group({
      'first_name': ["", [Validators.required]],
      'last_name': [""],
      'email': ["", [Validators.required, Validators.email]],
      'password': ["", [Validators.required]],
      'role': ['Customer']

    });
   }

  ngOnInit(){
    console.log('inside signup Component');
  }
  onSubmit() {
    console.log(this.signupForm.value);
    this.userService.signUp(this.signupForm.value).subscribe(resp => {
      console.log(resp);
    })
  }

}
