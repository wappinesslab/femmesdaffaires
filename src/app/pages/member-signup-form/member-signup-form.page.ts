import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-signup-form',
  templateUrl: './member-signup-form.page.html',
  styleUrls: ['./member-signup-form.page.scss'],
})
export class MemberSignupFormPage implements OnInit {

  ModernBrowserPlugin: any;

  options = {
    url : 'https://splitting.js.org/', //URL
    statusBarColor : '#00004d', //STATUS BAR COLOR
    toolbarColor : '#ffffff', //TOOLBAR COLOR
    iconDefaultColor : '#000000', //ICONS DEFAUT COLORS
    iconDisabledColor : '#A9A9A9', //DISABLE ICONS COLOR
    iconPressedColor : '#A9A9A9', //PRESSED ICON COLORS
    webViewCameraEnabled : true, // ENALBE CAMERA ACCESS
    showIconBack : true, //SHOW ICONS BACK
    disableIconBack : false, //DISABLE ICON BACK
    showIconForward : true, //SHOW FORWARD ICON
    disableIconForward : false, //DISABLE FORWARD ICON
    showIconMenu : true, //SHOW MENU ICON
    disableIconMenu : false, //DISABLE ICON MENU
    fileChooserEnabled : true, //SHOW FILE CHOSSER
    showProgressBar: true, //SHOW PROGESS BAR
    progressBarColor: '#00004d', //PROGRESS BAR COLOR
    showUrl: true, //SHOW URL TITLE
    titleColor: '#000000', //URL TITLE COLOR
    menuColor: '#ffffff', //MENU OPTIONS COLOR
    webViewAppCacheEnabled : false, //BROWSER CACHE 
    webViewGeolocationEnabled: true, //GEOLOCALTION
    webViewAudioEnabled: true, //ENABLE AUDIO ACCESS
    webViewCookieEnabled: true //ENABLE COOKIES
  };

  

  constructor() { }

  async ngOnInit() { }

  openBrowser() {
    this.ModernBrowserPlugin.create(this.options, function(loaded) {
      console.log(loaded);
      // DO SOMETHING AFTER URL LOAD
      }, function(err) {
      console.log(err);
    });
  }
  
}
