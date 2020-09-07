import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService,
    public popover: PopoverController
  ) { }

  ngOnInit() {}

  openPage(e) {
    this.router.navigateByUrl(e);
    this.popover.dismiss();
  }

  logOut(): void {
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl('login');
    });
    this.popover.dismiss();
  }
}
