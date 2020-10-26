import { Component, OnInit, Input } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/services/announcement.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.scss'],
})
export class EditAnnouncementComponent implements OnInit {
  @Input() id: string;
  
  business: any;
  
  files: File;
  fileName: string = "";
  logoIMG: any;
  logoImgURL: string = "";

  loading: HTMLIonLoadingElement;

  constructor(
    private announcementService: AnnouncementService,
    private loadingCtlr: LoadingController,
    private modal: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }


  async ngOnInit() {
    this.loading = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 5000
    });
    await this.loading.present();

    this.announcementService.getBusinessessDetails(`${this.id}`).then(async businessDetailsSnapshot => {
      this.business = await businessDetailsSnapshot.data();
        this.loading.dismiss();
    });

  }

  closeModal() {
    this.modal.dismiss();
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


  async updatePersonalInfo(): Promise <void> {
    const alert = await this.alertController.create({
      header: "Informations Personnelles",
      subHeader: "Modifier cette catégorie!",
      inputs: [
        {
          type: "text",
          name: "personFirstName",
          value: this.business.personFirstName
        },
        {
          type: "text",
          name: "personLastName",
          value: this.business.personLastName
        },
        {
          type: "email",
          name: "personEmail",
          value: this.business.personEmail
        },
        {
          type: "number",
          name: "personNIFCIN",
          value: this.business.personNIFCIN
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Modifier",
          handler: data => {
            this.announcementService.updatePersonalBusinessInfo(this.id, data.personFirstName, data.personLastName, data.personEmail, data.personNIFCIN).then( async () => {
              const toast = await this.toastController.create({
                message: 'Les infos persos ont été modifiées avec succès!',
                duration: 3000
              });
              toast.present();
              console.log('DATA', this.id, data.personFirstName, data.personLastName, data.personEmail, data.personNIFCIN);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  
  async updateBusinessInfo(): Promise <void> {
    const alert = await this.alertController.create({
      header: "Informations de l'Entreprise",
      subHeader: "Modifier cette catégorie!",
      inputs: [
        {
          type: "text",
          name: "companyName",
          value: this.business.companyName
        },
        {
          type: "text",
          name: "companyDescription",
          value: this.business.companyDescription
        },
        {
          type: "number",
          name: "phoneNumber",
          value: this.business.phoneNumber
        },
        {
          type: "text",
          name: "whatsappNumber",
          value: this.business.whatsappNumber
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Modifier",
          handler: data => {
            this.announcementService.updateBusinessBusinessInfo(this.id, data.companyName, data.companyDescription, data.phoneNumber, data.whatsappNumber).then( async () => {
              const toast = await this.toastController.create({
                message: 'Les infos Entreprise ont été modifiées avec succès!',
                duration: 3000
              });
              toast.present();
              console.log('DATA', this.id, data.companyName, data.companyDescription, data.phoneNumber, data.whatsappNumber);
            });
          }
        }
      ]
    });
    await alert.present();
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
        self.announcementService.updateBusinessLogo(self.id, self.logoImgURL, self.fileName).then(async() => {

          self.loading.dismiss();

          const toast = await self.toastController.create({
            message: 'Le logo a été modifié avec succès!',
            duration: 3000
          });
          toast.present();
        });
        console.log('IMG: ',self.logoImgURL, 'File name:', self.fileName);
      });
    });
  }


}
