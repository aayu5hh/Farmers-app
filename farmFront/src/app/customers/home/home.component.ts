import { Component, OnInit } from '@angular/core';
import { BackendRequestService } from '../../service/backendRequest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username;
  role;

  constructor(private backendService: BackendRequestService, private r: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.backendService.getUserDetails().subscribe(
      data => {this.username= data['first_name']; console.log(data)},
      (err) => this.r.navigate['login']);
  }

  goToLogin() {
    this.r.navigate(['login'], {relativeTo: this.activatedRoute});
  }

}
