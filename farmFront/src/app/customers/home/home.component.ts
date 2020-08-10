import { Component, OnInit } from '@angular/core';
import { BackendRequestService } from '../../service/backendRequest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private backendService: BackendRequestService) { }

  ngOnInit(): void {
    this.backendService.getUserDetails().subscribe(data => console.log(data));
  }

}
