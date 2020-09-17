import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-slider-top',
  templateUrl: './home-slider-top.component.html',
  styleUrls: ['./home-slider-top.component.scss'],
})
export class HomeSliderTopComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 3000,
    }
  };

  constructor() { }

  ngOnInit() {}

}
