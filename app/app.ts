import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from './pages/home/home';
import { TutorialPage } from './pages/tutorial/tutorial'

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl:'build/app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TutorialPage;

  pages : PageObj[] = [
    { title: 'Home', component: HomePage, icon: 'contacts' },
    { title: 'Top Promotions', component: HomePage, icon: 'person', index:1 },
    { title: 'Search Campaigns', component: HomePage, icon: 'search', index:2 },
    //{ title: 'Messages', component: HomePage, icon: 'email', index:3 },
    { title: 'Favorites', component: HomePage, icon: 'bookmark', index:4 },
    { title: 'Reviews/Comments', component: HomePage, icon: 'chatboxes', index:5 },
  ];

  loggedInPages: PageObj[] = [
    { title: 'Account', component: HomePage, icon: 'person' },
    { title: 'Logout', component: HomePage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: HomePage, icon: 'log-in' },
    { title: 'Signup', component: HomePage, icon: 'person-add' }
  ];

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

ionicBootstrap(MyApp);
