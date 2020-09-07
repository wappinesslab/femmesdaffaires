import { Component, OnInit } from "@angular/core";
import { AlertController, ActionSheetController, LoadingController  } from "@ionic/angular";
import { AuthService } from "../../services/user/auth.service";
import { ProfileService } from "../../services/user/profile.service";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  userProfile: any;
  loading: any;
  birthDate: Date;
  uCredentials: firebase.auth.UserCredential;
  files: any;
  photoURL: string = "";
  uPhoto: any;
  currentUser: any;
  profile: Array<any>;

  constructor(
    private alertCtrl: AlertController,
    public actionSC: ActionSheetController,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private load: LoadingController
    ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
        firebase.firestore().doc(`/users/${user.uid}`).get()
        .then(userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          this.birthDate = userProfileSnapshot.data().birthDate;
        }); 
      }
    });
  }

  async onChange(event) {
    let self = this;
    this.files = event.srcElement.files;
    this.uPhoto = firebase.storage().ref('usersphotos/' + this.files[0].name);
    
    this.uPhoto.put(this.files[0]).then(() => {
      this.uPhoto.getDownloadURL().then(function(photoURL) {
        firebase.firestore().doc(`users/${self.currentUser}`).update({
          photoURL: photoURL
        }).then(async () => {
            const alert = await self.alertCtrl.create({
              message: "Votre photo a été modifiée avec succès!",
              buttons: [{ text: "Ok", role: "Annuler" }]
            });
            await alert.present();
        },
        error => {
          console.log(error);
        });
      });
    });
  }

  getProfileImageStyle() {
    return 'url(' + this.userProfile.photoURL + ')'
  }

  async logOut(): Promise<void> {
    this.loading = await this.load.create({
      message: 'Déconnexion',
      duration: 4000
    });
    await this.loading.present();

    this.authService.logoutUser().then(() => {
      this.loading.dismiss().then(() => {
        this.router.navigateByUrl("/login");
      });
    });
  }
 
  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: "Surnom et Nom complet",
      inputs: [
        {
          type: "text",
          name: "nickName",
          placeholder: "Modifier votre surnom",
          value: this.userProfile.nickName
        },
        {
          type: "text",
          name: "fullName",
          placeholder: "Modifier votre nom complet",
          value: this.userProfile.fullName
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Sauvegarder",
          handler: data => {
            this.profileService.updateName(data.nickName, data.fullName);
          }
        }
      ]
    });
    await alert.present();
  }

  updateDOB(birthDate: any): void {
    if (birthDate === undefined) {
      return;
    }
    this.profileService.updateDOB(birthDate);
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          type: "text",
          name: "newEmail",
          placeholder: "Taper votre nouvel email"
        },
        {
          name: "password",
          placeholder: "Votre mot de passe actuel",
          type: "password"
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Sauvegarder",
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log("Email Changed Successfully");
              })
              .catch(error => {
                console.log("ERROR: " + error.message);
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: "newPassword",
          placeholder: "Entrer votre nouveau mot de passe",
          type: "password"
        },
        {
          name: "oldPassword",
          placeholder: "Entrer votre ancien mot de passe",
          type: "password"
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Sauvegarder",
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    await alert.present();
  }

  openPage(e) {
    this.router.navigateByUrl(e);
  }
}
