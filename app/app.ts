import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, Push } from 'ionic-native';

import { HomePage } from './pages/home/home';
import { TutorialPage } from './pages/tutorial/tutorial'
import { VerifyPage } from './pages/verify/verify'
import { FavoritesPage } from './pages/favorites/favorites';
import { TrendingPage } from './pages/trending/trending';
import { SearchPage } from './pages/search/search';


import { UserProvider } from './providers/user-provider/user-provider';

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
    { title: 'Trending', component: TrendingPage, icon: 'person', index:1 },
    { title: 'Search Campaigns', component: HomePage, icon: 'search', index:2 },
    //{ title: 'Messages', component: HomePage, icon: 'email', index:3 },
    { title: 'My Favorites', component: FavoritesPage, icon: 'bookmark', index:4 },
  ];

  loggedInPages: PageObj[] = [
    { title: 'Account', component: HomePage, icon: 'person' },
    { title: 'Logout', component: HomePage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: HomePage, icon: 'log-in' },
    { title: 'Signup', component: HomePage, icon: 'person-add' }
  ];

  constructor(public platform: Platform, private userProvider: UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();



      Splashscreen.hide();

      // var push = Push.init({
      //   android: {
      //     senderID: "126468130105"
      //   },
      //   ios: {
      //     alert: "true",
      //     badge: true,
      //     sound: 'false'
      //   },
      //   windows: {}
      // });

      // push.on('registration', (data) => {
      //   console.log(data.registrationId);
      //   alert(data.registrationId.toString());
      // });
      // push.on('notification', (data) => {
      //   console.log(data);
      //   alert("Hi, Am a push notification");
      // });
      // push.on('error', (e) => {
      //   console.log(e.message);
      // });
    });

  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {

      }, 1000);
    }
  }


}

ionicBootstrap(MyApp, [UserProvider]);
