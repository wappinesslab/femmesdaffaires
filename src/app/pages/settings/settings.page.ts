import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/components/profile-popover/profile-popover.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public userProfile: any = {};
  public isAdminLoggedIn : boolean = false;

  constructor(
    public router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    public loadingCtlr: LoadingController,
    public popover: PopoverController
  
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtlr.create({
      message: 'Chargement...',
      duration: 3000
    });
    await loading.present();

    this.profileService.getUserProfile().then(userProfileSnapshot => {
      if (userProfileSnapshot.data()) {
        this.userProfile = userProfileSnapshot.data();
        loading.dismiss();
      }
    });
  }

  async profilePopover(event) {
    const pop = await this.popover.create({
      component: ProfilePopoverComponent,
      event,
      translucent: true
    });
    return await pop.present();
  }

  logOut(): void {
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl('login');
    });
  }

}
