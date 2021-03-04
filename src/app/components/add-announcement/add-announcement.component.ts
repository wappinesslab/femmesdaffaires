import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from "firebase";
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
})
export class AddAnnouncementComponent implements OnInit {
  
  announcementForm: FormGroup;

  files: File;
  fileName: string = "";
  logoIMG: any;
  logoImgURL: string = "";
  imgLogoURL: string = "";
  states: any[];
  cities: any[];
  segmentShowFirst: string = "businesses"
  
  loading: HTMLIonLoadingElement;
   
  categoryList: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private annoucementService: AnnouncementService,
    public modalCtlr: ModalController,
    private router: Router,
    private loadingCtlr: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.announcementForm = this.formBuilder.group({
      personFirstName: ["", Validators.compose([Validators.maxLength(30)])],
      personLastName: ["", Validators.compose([Validators.maxLength(30)])],
      personBirthday: ["", Validators.compose([])],
      personEmail: ["", Validators.compose([Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.email])],
      personNIFCIN: ["", Validators.compose([Validators.pattern('^^((\\+509-?)|0)?[0-9]*$')])],
      personStatus: ["", Validators.compose([])],
      companyStatus: ["", Validators.compose([])],
      companyName: ["", Validators.compose([Validators.maxLength(30)])],
      companyDescription: ["", Validators.compose([Validators.maxLength(500)])],
      categoryID: ["", Validators.compose([])],
      companyEnrollDate: ["", Validators.compose([])],
      companyEmail: ["", Validators.compose([Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.email])],
      whatsappNumber: ["", Validators.compose([Validators.pattern('^^((\\+509-?)|0)?[0-9]{8}$')])],
      phoneNumber: ["", Validators.compose([Validators.pattern('^^((\\+509-?)|0)?[0-9]{8}$')])],
      companyPhone3: ["", Validators.compose([Validators.pattern('^^((\\+509-?)|0)?[0-9]{8}$')])],
      companyAddress: ["", Validators.compose([Validators.maxLength(50)])],
      companyState: ["", Validators.compose([])],
      companyCity: ["", Validators.compose([])],
      companyWebsite: ["", Validators.compose([Validators.maxLength(50)])],
      annualFee: ["", Validators.compose([])]
    });
    
    this.states = [
      {
        id: '05',
        name: 'Artibonite'
      },
      {
        id: '06',
        name: 'Centre'
      },
      {
        id: '08',
        name: "Grand'Anse"
      },
      {
        id: '10',
        name: 'Nippes'
      },
      {
        id: '03',
        name: 'Nord'
      },
      {
        id: '04',
        name: "Nord-Est"
      },
      {
        id: '09',
        name: 'Nord-Ouest'
      },
      {
        id: '01',
        name: 'Ouest'
      },
      {
        id: '07',
        name: 'Sud'
      },
      {
        id: '02',
        name: 'Sud-Est'
      }
    ];


    
    this.cities = [
      {
        id: '1',
        name: 'Port-au-Prince'
      },
      {
        id: '2',
        name: 'Carrefour'
      },
      {
        id: '3',
        name: "Delmas"
      },
      {
        id: '4',
        name: 'Cap Haitien'
      },
      {
        id: '5',
        name: 'Pétionville'
      },
      {
        id: '6',
        name: "Les Gonaïves"
      },
      {
        id: '7',
        name: 'Saint-Marc'
      },
      {
        id: '8',
        name: 'Les Cayes'
      },
      {
        id: '9',
        name: 'Verrettes'
      },
      {
        id: '10',
        name: 'Port-de-Paix'
      },
      {
        id: '11',
        name: 'Jacmel'
      },
      {
        id: '12',
        name: 'Limbé'
      },
      {
        id: '13',
        name: "Jérémie"
      },
      {
        id: '14',
        name: "Petite-Rivière-de-l'Artibonite"
      },
      {
        id: '15',
        name: 'Hinche'
      },
      {
        id: '16',
        name: "Petit-Goâves"
      },
      {
        id: '17',
        name: 'Desdunes'
      },
      {
        id: '18',
        name: 'Dessalines'
      },
      {
        id: '19',
        name: 'Saint-Louis-du-Nord'
      },
      {
        id: '20',
        name: "Saint-Michel-de-l'Attalaye"
      },
      {
        id: '21',
        name: 'Léogâne'
      },
      {
        id: '22',
        name: 'Fort-Liberté'
      },
      {
        id: '23',
        name: "Trou-Du-Nord"
      },
      {
        id: '24',
        name: 'Ouanaminthe'
      },
      {
        id: '25',
        name: 'Mirbalais'
      },
      {
        id: '26',
        name: "	Grande-Rivière-du-Nord"
      },
      {
        id: '27',
        name: 'Lascahobas'
      },
      {
        id: '28',
        name: "Anse-d'Ainault"
      },
      {
        id: '29',
        name: 'Gros-Morne'
      },
      {
        id: '30',
        name: 'Anse-à-Galets'
      },
      {
        id: '31',
        name: 'Pignon'
      },
      {
        id: '32',
        name: 'Croix-des-Bouquets'
      },
      {
        id: '33',
        name: "Dame-Marie"
      },
      {
        id: '34',
        name: 'Miragoâne'
      },
      {
        id: '35',
        name: 'Saint-Raphael'
      },
      {
        id: '36',
        name: "Aquin"
      },
      {
        id: '37',
        name: "Kenscoff"
      }
    ];

  }

  async ngOnInit() {
          
    this.loading = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 5000
    });
    await this.loading.present();

    firebase.firestore().collection("categories").orderBy("createdAt", "desc").get().then(async catListSnapshot => {
      this.categoryList = await [];
      catListSnapshot.forEach( async (snap) => {
          this.categoryList.push({
            id: snap.id,
            name: snap.data().name,
            slug: snap.data().slug,
            createdAt: snap.data().createdAt,
          });
          this.loading.dismiss();
        return false;
      });
    });
  }

  ionViewDidLeave() {
    this.modalCtlr.dismiss();
  }

  
  async onChange(event) {

    this.loading = await this.loadingCtlr.create({
      message: 'Chargement du logo...',
      duration: 30000
    });
    await this.loading.present();

    const self = this;
    this.files = event.srcElement.files;
    this.logoIMG = firebase.storage().ref('businesses-logos/' + this.files[0].name);
    this.logoIMG.put(this.files[0]).then(async () => {
      await this.logoIMG.getDownloadURL().then(function(logoImgUrl) {
        self.logoImgURL = logoImgUrl;
        self.fileName = self.files[0].name;
        console.log('IMG: ',self.logoImgURL, 'File name:', self.fileName);
      });
    });
    this.loading.dismiss();
  }

  
  async createAnnouncement(announcementForm): Promise<void> {
    if (!announcementForm.valid) {
      console.log("Need to complete the form, current value: ", announcementForm.value); 
    }

    const self = this;
    
    const personFirstName: string = announcementForm.value.personFirstName;
    const personLastName: string = announcementForm.value.personLastName;
    const personBirthday: any = announcementForm.value.personBirthday;
    const personEmail: string = announcementForm.value.personEmail;
    const personNIFCIN: number = announcementForm.value.personNIFCIN;
    const personStatus: string = announcementForm.value.personStatus;
    const companyStatus: String = announcementForm.value.companyStatus;
    const companyName: string = announcementForm.value.companyName;
    const companyDescription: string = announcementForm.value.companyDescription;
    const categoryID: string = announcementForm.value.categoryID;
    const companyEnrollDate: string = announcementForm.value.companyEnrollDate;
    const companyEmail: string = announcementForm.value.companyEmail;
    const whatsappNumber: number = announcementForm.value.whatsappNumber;
    const phoneNumber: number = announcementForm.value.phoneNumber;
    const companyPhone3: number = announcementForm.value.companyPhone3;
    const companyAddress: string = announcementForm.value.companyAddress;
    const companyState: string = announcementForm.value.companyState;
    const companyCity: string = announcementForm.value.companyCity;
    const companyWebsite: string = announcementForm.value.companyWebsite;
    const annualFee: string = announcementForm.value.annualFee;

    console.log(personFirstName, personLastName, personBirthday, personEmail, personNIFCIN, personStatus, companyStatus, companyName, companyDescription, categoryID, companyEnrollDate, companyEmail, whatsappNumber, phoneNumber, companyPhone3, companyAddress, companyState, companyCity, companyWebsite, annualFee, self.logoImgURL, this.fileName);
    
    self.annoucementService
    .createAnnouncement(personFirstName, personLastName, personBirthday, personEmail, personNIFCIN, personStatus, companyStatus, companyName, companyDescription, categoryID, companyEnrollDate, companyEmail, whatsappNumber, phoneNumber, companyPhone3, companyAddress, companyState, companyCity, companyWebsite, annualFee, self.logoImgURL, this.fileName)
    .then(() => {
      console.log(announcementForm);
      self.loading.dismiss().then(() => {
        self.router.navigateByUrl("/home");
        this.modalCtlr.dismiss();
        this.segmentShowFirst = "businesses";
      });
    },
    error => {
      self.loading.dismiss().then(async () => {
        const alert = await self.alertCtrl.create({
          message: error.message,
          buttons: [{ text: "Ok", role: "Annuler" }]
        });
        await alert.present();
      });
    });


      this.loading = await this.loadingCtlr.create();
      await this.loading.present();
  }

  async closeModal() {
    await this.modalCtlr.dismiss();
  }

}
