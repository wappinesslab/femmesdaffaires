import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription: any;
  categoryList: Array<any>;
  
  businessList: Array<any>;

  loading: HTMLIonLoadingElement;

  constructor(
    private loadingCtlr: LoadingController,
    private route: ActivatedRoute,
    private platform: Platform
  ) { }

  async ngOnInit() {

    this.loading = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 5000
    });
    await this.loading.present();

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

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }


  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
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
