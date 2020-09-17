import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.page.html',
  styleUrls: ['./business-details.page.scss'],
})
export class BusinessDetailsPage implements OnInit {
  public currentBusiness: any = {};

  constructor(
    private route: ActivatedRoute,
    private announcementList: AnnouncementService
  ) { }

  ngOnInit() {
    
    const businessId: string = this.route.snapshot.paramMap.get('id');
    this.announcementList.getBusinessessDetails(businessId).then( businessSnapshot => {
      this.currentBusiness = businessSnapshot.data();
      this.currentBusiness.id = businessSnapshot.id;
    });

  }

}
