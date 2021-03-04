import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddAnnouncementComponent } from 'src/app/components/add-announcement/add-announcement.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  constructor(
    private modalCtlr: ModalController,
    private popover: PopoverController
  ) {
    this.addAnouncementCategoryModal();
   }

  ngOnInit() { }

  async addAnouncementCategoryModal() {
    const modal = await this.modalCtlr.create({
      component: AddAnnouncementComponent,
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

}
