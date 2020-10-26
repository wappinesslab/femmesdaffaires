import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.page.html',
  styleUrls: ['./business-details.page.scss'],
})
export class BusinessDetailsPage implements OnInit {
  id: string;
  business: any = {};

  constructor(
    private route: ActivatedRoute,
    private announcementList: AnnouncementService
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.announcementList.getBusinessessDetails(this.id).then( businessSnapshot => {
      this.business = businessSnapshot.data();
      this.business.id = businessSnapshot.id;
    });

  }

    
  myFormat = function(date) {
    var month_names = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juil.",
      "aôut",
      "sépt.",
      "oct.",
      "nov.",
      "déc."
    ];
    let d = new Date(date);
    var day = d.getDate();
    var month_index = d.getMonth();
    var year = d.getFullYear();

    return "" + day + " " + month_names[month_index] + " " + year;
  }


}
