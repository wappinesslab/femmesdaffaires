import { Component, OnInit,  Output, EventEmitter, OnChanges, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FilterPipe } from "./FilterPipe";

@Component({
  selector: 'app-businesses-list',
  templateUrl: './businesses-list.page.html',
  styleUrls: ['./businesses-list.page.scss'],
  providers: [FilterPipe],
})
export class BusinessesListPage implements OnInit {

  @Output() onItemClick = new EventEmitter();
  @Output() onTextChange = new EventEmitter();

  search = "";


  id: String;
  businessesList: Array<any>;
  loading: HTMLIonLoadingElement;
  categoryName: String;

  sampleArr = [];
  resultArr = [];

  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private loadingCtlr: LoadingController,
    private afs: AngularFirestore
  ) { }

  
  onTextChangeFunc(item): void {
    if (event) {
      event.stopPropagation();
    }
    this.setSearchValue(item)
    this.onTextChange.emit(this.search);
  }

  setSearchValue(item) {
    if (item.detail && item.detail.target) {
      this.search = item.detail.target.value
    } else {
      this.search = ''
    }
  }

  async ngOnInit() {
    this.loading = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 5000
    });
    await this.loading.present();

    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryName = this.route.snapshot.paramMap.get('name');
    this.announcementService.getBusinessessesList().where('categoryID', '==', `${this.id}`).where('annualFee', '==', 'uptodate').orderBy("createdAt", "desc").get().then( async businessDetailsSnapshot => {
      this.businessesList = await [];
      businessDetailsSnapshot.forEach( async (snap) => {
          this.businessesList.push({
            id: snap.id,
            personFirstName: snap.data().personFirstName,
            personLastName: snap.data().personLastName,
            description: snap.data().description,
            category: snap.data().categoryID,
            companyName: snap.data().companyName,
            companyCity: snap.data().companyCity,
            personEmail: snap.data().personEmail,
            whatsappNumber: snap.data().whatsappNumber,
            phoneNumber: snap.data().phoneNumber,
            companyPhone3: snap.data().companyPhone3,
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

  async searchTerm(ev) {
    this.businessesList = await [];
    const searchTerm = ev.srcElement.value;

    this.businessesList = this.businessesList.filter(currentBusiness => {
      if(currentBusiness.companyName && searchTerm) {
        return (currentBusiness.companyName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentBusiness.personFirstName.toLoweCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    })
  }

}
