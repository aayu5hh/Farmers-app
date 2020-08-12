import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendRequestService } from '../../service/backendRequest.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private backendService: BackendRequestService, private r: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  continue() {
    this.r.navigate(['/customers']);
  }

}
