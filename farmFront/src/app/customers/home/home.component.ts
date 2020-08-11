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
  allFarmers;
  
  constructor(private backendService: BackendRequestService, private r: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.backendService.getUserDetails().subscribe(
    //   (data) => {
    //     console.log('getting username');
    //     this.username= data['first_name']; console.log(data)
    //   },
    //   (err) => this.r.navigate['login']
    // );
    
    this.backendService.getAllFarmersData().subscribe(
      (data) => {
        console.log('getting all farmers data..');
        console.log(data);
        this.allFarmers = data;
      },
      (err) => console.log('Error occured while retrieving data =>', err)
    )

  }

  goToLogin() {
    this.r.navigate(['login'], {relativeTo: this.activatedRoute});
  }

}
