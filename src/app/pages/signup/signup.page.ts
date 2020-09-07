import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  loading: HTMLIonLoadingElement;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.email])],
      password: ["", Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required])],
      firstname: ["", Validators.compose([ Validators.required])],
      lastname: ["", Validators.compose([ Validators.required])]
    });
  }

  ngOnInit() {}

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log("Need to complete the form, current value: ", signupForm.value); 
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      const firstname: string = signupForm.value.firstname;
      const lastname: string = signupForm.value.lastname;

      firebase.auth().createUserWithEmailAndPassword(email, password).then(async (newUserCredentials) =>{
        firebase.firestore().doc(`/users/${newUserCredentials.user.uid}`).set({
            email, firstname, lastname, fullname: firstname + ' ' + lastname, createdAt: Date.now()
        }).then(
            () => {
              this.loading.dismiss().then(() => {
                this.router.navigateByUrl("/home");
              });
            },
            error => {
              this.loading.dismiss().then(async () => {
                const alert = await this.alertCtrl.create({
                  header: 'Alerte',
                  subHeader: "Une érreur s'est produite !",
                  message: error.message,
                  buttons: ['OK']
                });
                await alert.present();
              });
            }
          );
          this.loading = await this.loadingCtrl.create();
          await this.loading.present();
      })
      .catch(error => {
        throw new Error(error);
      });
    }
  }
}
