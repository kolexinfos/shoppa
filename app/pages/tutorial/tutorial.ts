import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';



interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.slides = [
      {
        title: 'Welcome to <b>Shoppa</b>',
        description: '<b>Shoppa</b> rewards customers that move fast. How does it work?',
        image: 'img/ica-slidebox-img-1.png',
      },
      {
        title: 'This is how <b>Shoppa</b> Works',
        description: 'Brands you love release limited batches of rewards on Shoppa',
        image: 'img/ica-slidebox-img-2.png',
      },
      {
        title: 'Then what happens next?',
        description: 'Tell them you <i>Want In</i> to gain access and get notified when there campaign goes live.',
        image: 'img/ica-slidebox-img-3.png',
      },
      {
        title: 'Need some tips to always get in??',
        description: 'Gain a <i>heads-up</i> by inviting friends and taking other actions ahead of the live release.</b>.',
        image: 'img/ica-slidebox-img-3.png',
      }
    ];
  }

  startApp() {
    //this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(SignupPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
