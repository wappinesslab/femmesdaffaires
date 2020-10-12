import { Component, OnInit, Input } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-annoucement-category',
  templateUrl: './add-annoucement-category.component.html',
  styleUrls: ['./add-annoucement-category.component.scss'],
})
export class AddAnnoucementCategoryComponent implements OnInit {

  @Input() modalTitle: string;
  @Input() modalSubmitBtn: string;
  @Input() name: string;
  @Input() slug: string;

  announcementCategoryForm: FormGroup;
  segmentShowFirst: string;
  
  loading: HTMLIonLoadingElement;

  constructor(
    private announcementService: AnnouncementService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtlr: LoadingController,
    private modal: ModalController,
    private toastController: ToastController
  ) {
    this.announcementCategoryForm = this.formBuilder.group({
      categoryName: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      categorySlug: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])]
    });
  }

  async createAnnouncementCategory(announcementCategoryForm): Promise<void> {
    if (!announcementCategoryForm.valid) {
      console.log("Need to complete the form, current value: ", announcementCategoryForm.value); 
    } else {

    const categoryName: string = announcementCategoryForm.value.categoryName;
    const categorySlug: string = announcementCategoryForm.value.categorySlug;
        
    this.announcementService
      .createAnnouncementCategory(categoryName, categorySlug)
      .then(() => {
        console.log(announcementCategoryForm);
        this.loading.dismiss().then(() => {
          this.router.navigateByUrl("/dashboard");
          this.modal.dismiss();
          this.segmentShowFirst = "categories";
        });
      },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "Annuler" }]
            });
            await alert.present();
          });
        });      
    }
      this.loading = await this.loadingCtlr.create();
      await this.loading.present();
  }

  updateAnnouncementCategory(categoryID: String, categoryName: String) {
    this.announcementService.updateAnnouncementCategory(categoryID, categoryName).then( async () => {
      const toast = await this.toastController.create({
        message: 'Cette catégorie a été modifiée avec succès!',
        duration: 3000
      });
      toast.present();
    });
  }

  ngOnInit() {}

  async closeModal() {
    await this.modal.dismiss();
  }

}
