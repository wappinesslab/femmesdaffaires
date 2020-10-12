import { Component, OnInit } from '@angular/core';
import { DashboardFabComponent } from 'src/app/components/dashboard-fab/dashboard-fab.component';
import { PopoverController, LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import * as firebase from "firebase";
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  segmentShowFirst: string;
  categoryList: Array<any>;
  businessList: Array<any>;

  businessCategory: any;

  loading: HTMLIonLoadingElement;

  constructor(
    public popover: PopoverController,
    private loadingCtlr: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtlr: ModalController,
    private alertCtrl: AlertController,
    private announcementService: AnnouncementService
  ) {
    this.segmentShowFirst = "businesses";
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

    
    firebase.firestore().collection("businesses").orderBy("createdAt", "desc").get().then(async bizListSnapshot => {
      this.businessList = await [];
      bizListSnapshot.forEach( async (snap) => {
          this.businessList.push({
            id: snap.id,
            personFirstName: snap.data().personFirstName,
            personLastName: snap.data().personLastName,
            description: snap.data().description,
            ceo: snap.data().ceo,
            category: snap.data().category,
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

  async dashnoardFAB(event) {
    const pop = await this.popover.create({
      component: DashboardFabComponent,
      event,
      translucent: true
    });
    return await pop.present();
  }

  async editBusinessCategory(catID, catName, sliding): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: catName,
      subHeader: "Modifier cette catégorie!",
      inputs: [
        {
          type: "text",
          name: "categoryName",
          value: catName
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Modifier",
          handler: data => {
            this.announcementService.updateAnnouncementCategory(catID, data.categoryName).then( async () => {
              const toast = await this.toastController.create({
                message: 'Cette catégorie a été modifiée avec succès!',
                duration: 3000
              });
              toast.present();
              console.log('CATID', catID, data.categoryName);
            });
          }
        }
      ]
    });
    await alert.present();
    sliding.close();
    console.log(catID, catName);
  }


  

  async deleteBusiness(bizLogo, bizName, bizID, sliding) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: bizName,
      subHeader: 'Êtes-vous sûr de vouloir supprimer cette entreprise?',
      message: 'La suppréssion sera définitive.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Suppréssion annulée!');
          }
        }, {
          text: 'Supprimer',
          cssClass: 'primary',
          handler: async () => {
            await firebase.firestore().doc(`/businesses/${bizID}`).delete().then(() => {
              var storageRef = firebase.storage().ref();
              var deleteLogo = storageRef.child(`/businesses-logos/${bizLogo}`);
              deleteLogo.delete().then( async() => {
                
                  this.loading = await this.loadingCtlr.create({
                    message: 'Chargement...',
                    duration: 5000
                  });
                  await this.loading.present();

                  const toast = await this.toastController.create({
                    message: 'Cette entreprise a été supprimée avec succès!',
                    duration: 3000
                  });
                  toast.present();
                  this.loading.dismiss();
                console.log("Logo supprimé!");
              });
              console.log('Suppréssion réussie!');
            });
            console.log('Suppréssion confirmée!');
          }
        }
      ]
    });
    await alert.present();
    sliding.close();
  }

  
  async deleteBusinessCategory(categoryName, categoryID, sliding) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: categoryName,
      subHeader: 'Êtes-vous sûr de vouloir supprimer cette catégorie?',
      message: 'La suppréssion sera définitive.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Suppréssion de la catégorie annulée!');
          }
        }, {
          text: 'Supprimer',
          cssClass: 'primary',
          handler: async () => {
            await firebase.firestore().doc(`/categories/${categoryID}`).delete().then( async() => {

              this.loading = await this.loadingCtlr.create({
                message: 'Chargement...',
                duration: 5000
              });
              await this.loading.present();

              const toast = await this.toastController.create({
                message: 'Cette entreprise a été supprimée avec succès!',
                duration: 3000
              });
              toast.present();
              this.loading.dismiss();
              console.log('Suppréssion de la catégorie réussie!');
            });
            console.log('Suppréssion confirmée!');
          }
        }
      ]
    });
    await alert.present();
    sliding.close();
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
