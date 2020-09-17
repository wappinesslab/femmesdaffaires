import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-businesses-list',
  templateUrl: './businesses-list.page.html',
  styleUrls: ['./businesses-list.page.scss'],
})
export class BusinessesListPage implements OnInit {
  id: String;
  businessesList: Array<any>;
  loading: HTMLIonLoadingElement

  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private loadingCtlr: LoadingController
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 5000
    });
    await this.loading.present();

    this.id = this.route.snapshot.paramMap.get('id');
    this.announcementService.getBusinessessesList().where('companyCategory', '==', `${this.id}`).orderBy("createdAt", "desc").get().then( async businessDetailsSnapshot => {
      this.businessesList = await [];
      businessDetailsSnapshot.forEach( async (snap) => {
          this.businessesList.push({
            id: snap.id,
            personFirstName: snap.data().personFirstName,
            personLastName: snap.data().personLastName,
            description: snap.data().description,
            ceo: snap.data().ceo,
            category: snap.data().categoryID,
            personEmail: snap.data().personEmail,
            phoneNumber: snap.data().phoneNumber,
            phone1: snap.data().phone1,
            phone2: snap.data().phone2,
            address: snap.data().address,
            state: snap.data().state,
            website: snap.data().website,
            logoImgUrl: snap.data().logoImgUrl,
            logoImgName: snap.data().logoImgName,
            createdAt: snap.data().createdAt,
          });
          this.loading.dismiss();
        return false;
      });
    });

  }

}