import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoadingController, AlertController, Platform } from "@ionic/angular";
import { AuthService } from "../../services/user/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private gp: GooglePlus,
    private platform: Platform
  ) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.router.navigateByUrl("/home");
      }
    });

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {}

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log("Form is not valid yet, current value:", loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const email = loginForm.value.email;
      const password = loginForm.value.password;

      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("/home");
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              header: "Alerte",
              subHeader: "Une érreur s'est produite!",
              message: error.message,
              buttons: ['OK']
            });
            await alert.present();
          });
        }
      );
    }
  }

  
  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }
  
  webGoogleLogin(): void {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.signInWithPopup(provider)
      .then( response => {
        this.router.navigateByUrl('/home');
        console.log("Firebase success: " + JSON.stringify(response));
    });
  
    } catch(err) {
      console.log(err)
    }
  
  }

  nativeGoogleLogin(): void {
    this.gp.login({
      'webClientId': '763075706479-ibfpdain0r8shaplbdo9hao6te5ojctb.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
            const googleCredential = firebase.auth.GoogleAuthProvider
                .credential(res.idToken);
   
            firebase.auth().signInWithCredential(googleCredential)
          .then( response => {
            this.router.navigateByUrl('/home');
              console.log("Firebase success: " + JSON.stringify(response));
          });
    }, err => {
        console.error("Error: ", err)
    });
  }
   
}
