import { Injectable } from '@angular/core';
import { AuthService } from './user/auth.service';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  public categoriesList: firebase.firestore.CollectionReference;
  public announcementList: firebase.firestore.CollectionReference;
  public announcementCategoryListRef: firebase.firestore.CollectionReference;
  public announcementListRef: firebase.firestore.CollectionReference;

  categoryDocRef: firebase.firestore.DocumentReference;
  businessDocRef: firebase.firestore.DocumentReference;

  constructor(
    private authService: AuthService
  ) {
    this.announcementListRef = firebase.firestore().collection(`businesses`);
    this.categoriesList = firebase.firestore().collection(`categories`);
  }

  getBusinessessesList(): firebase.firestore.CollectionReference {
    return this.announcementListRef;
  }

  async getBusinessessDetails(
    businessId: string
  ): Promise<firebase.firestore.DocumentSnapshot> {
    this.announcementList = firebase
      .firestore()
      .collection(`businesses`);
    return this.announcementList.doc(businessId).get();
  }


  getCategoriesDetails(): firebase.firestore.CollectionReference {
    return this.categoriesList;
  }

  async createAnnouncementCategory(
    categoryName: string,
    categorySlug: string,
    categoryParent: string = "",
    categoryChild: string = "",
    categoryIcon: string = ""
  ): Promise<firebase.firestore.DocumentReference> {
    const user: firebase.User = await this.authService.getUser();
    this.announcementCategoryListRef = firebase
      .firestore()
      .collection(`categories`);
    return this.announcementCategoryListRef.add({
      name: categoryName,
      slug: categorySlug,
      parent: categoryParent,
      child: categoryChild,
      icon: categoryIcon,
      createdAt: Date.now(),
      adminID: `${user.uid}`
    });
  }

  
  async createAnnouncement(
    personFirstName: String,
    personLastName: String,
    personBirthday: any,
    personEmail: String,
    personNIFCIN: Number,
    companyStatus: String,
    companyName: string,
    companyDescription: string,
    categoryID: String,
    companyEnrollDate: String,
    companyEmail: string,
    whatsappNumber: number,
    phoneNumber: number,
    companyPhone3: number,
    companyAddress: string,
    companyState: string,
    companyCity: String,
    companyWebsite: string,
    annualFee: String,
    logoImgUrl: string,
    logoImgName: string,
  ): Promise<firebase.firestore.DocumentReference> {
    const user: firebase.User = await this.authService.getUser();
    this.announcementListRef = firebase
      .firestore()
      .collection(`businesses`);
    return this.announcementListRef.add({
      personFirstName,
      personLastName,
      personBirthday,
      personEmail,
      personNIFCIN,
      companyStatus,
      companyName,
      companyDescription,
      categoryID,
      companyEnrollDate,
      companyEmail,
      whatsappNumber,
      phoneNumber,
      companyPhone3,
      companyAddress,
      companyState,
      companyCity,
      companyWebsite,
      annualFee,
      logoImgUrl,
      logoImgName,
      createdAt: Date.now(),
      adminID: `${user.uid}`
    });
  }

    
  async createTempAnnouncement(
    personFirstName: String,
    personLastName: String,
    personBirthday: any,
    personEmail: String,
    personNIFCIN: Number,
    companyStatus: String,
    companyName: string,
    companyDescription: string,
    categoryID: String,
    companyEnrollDate: String,
    companyEmail: string,
    whatsappNumber: number,
    phoneNumber: number,
    companyPhone3: number,
    companyAddress: string,
    companyState: string,
    companyCity: String,
    companyWebsite: string,
    logoImgUrl: string,
    logoImgName: string,
  ): Promise<firebase.firestore.DocumentReference> {
    this.announcementListRef = firebase
      .firestore()
      .collection(`temp-businesses`);
    return this.announcementListRef.add({
      personFirstName,
      personLastName,
      personBirthday,
      personEmail,
      personNIFCIN,
      companyStatus,
      companyName,
      companyDescription,
      categoryID,
      companyEnrollDate,
      companyEmail,
      whatsappNumber,
      phoneNumber,
      companyPhone3,
      companyAddress,
      companyState,
      companyCity,
      companyWebsite,
      logoImgUrl,
      logoImgName,
      createdAt: Date.now(),
    });
  }
  
  
  async updateAnnouncementCategory(categoryID: String, categoryName: String): Promise<any> {
    this.categoryDocRef  = await firebase.firestore().doc(`categories/${categoryID}`);
    return this.categoryDocRef.update({ name: categoryName });
  }

  async updatePersonalBusinessInfo(id: String, personFirstName: String, personLastName: String, personEmail: String, personNIFCIN: Number): Promise<any> {
    this.categoryDocRef  = await firebase.firestore().doc(`businesses/${id}`);
    return this.categoryDocRef.update({ personFirstName, personLastName, personEmail, personNIFCIN});
  }

  async updateBusinessBusinessInfo(id: String, companyName: String, companyDescription: String, phoneNumber: Number, whatsappNumber: Number): Promise<any> {
    this.categoryDocRef  = await firebase.firestore().doc(`businesses/${id}`);
    return this.categoryDocRef.update({ companyName, companyDescription, phoneNumber, whatsappNumber});
  }

  async updateBusinessLogo(id: String, logoImgUrl: String, logoImgName: String): Promise<any> {
    this.categoryDocRef  = await firebase.firestore().doc(`businesses/${id}`);
    return this.categoryDocRef.update({ logoImgUrl, logoImgName});
  }


}
