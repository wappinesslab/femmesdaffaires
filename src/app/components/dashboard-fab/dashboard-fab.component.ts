import { Component, OnInit } from '@angular/core';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddAnnoucementCategoryComponent } from '../add-annoucement-category/add-annoucement-category.component';

@Component({
  selector: 'app-dashboard-fab',
  templateUrl: './dashboard-fab.component.html',
  styleUrls: ['./dashboard-fab.component.scss'],
})
export class DashboardFabComponent implements OnInit {

  constructor(
    private modalCtlr: ModalController,
    private popover: PopoverController
  ) { }

  ngOnInit() {}


  async addAnouncementCategoryModal() {
    const modal = await this.modalCtlr.create({
      component: AddAnnoucementCategoryComponent,
      componentProps: {
        'modalTitle' : 'Ajouter une catégorie',
        'modalSubmitBtn' : 'Ajouter'
      },
      cssClass: 'custom-modal-css',
      backdropDismiss: false
    })
    await modal.present();
    this.popover.dismiss();
  }

  async addAnouncementModal() {
    const modal = await this.modalCtlr.create({
      component: AddAnnouncementComponent,
      componentProps: {},
      cssClass: 'custom-modal-css',
      backdropDismiss: false
    })
    await modal.present();
    this.popover.dismiss();
  }

}
