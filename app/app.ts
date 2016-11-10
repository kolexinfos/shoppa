import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from './pages/home/home';
import { TutorialPage } from './pages/tutorial/tutorial'
import { VerifyPage } from './pages/verify/verify'
import { FavoritesPage } from './pages/favorites/favorites';
import { TrendingPage } from './pages/trending/trending';
import { SearchPage } from './pages/search/search';
import { BrandsPage } from './pages/brands/brands';
import { SparksPage } from './pages/sparks/sparks';

import { CloudSettings,  Push, PushToken } from '@ionic/cloud-angular';


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

  rootPage: any = HomePage;


  pages : PageObj[] = [
    { title: 'Campaigns', component: HomePage, icon: 'contacts' },
    { title: 'Brands', component: BrandsPage, icon: 'bookmark', index:1 },
    { title: 'My Favorites', component: FavoritesPage, icon: 'bookmark', index:2 },
    { title: 'My Sparks', component: SparksPage, icon: 'bookmark', index:3 },
  ];
  
  loggedInPages: PageObj[] = [
    { title: 'Account', component: HomePage, icon: 'person' },
    { title: 'Logout', component: HomePage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: HomePage, icon: 'log-in' },
    { title: 'Signup', component: HomePage, icon: 'person-add' }
  ];

  
  constructor(public platform: Platform, private userProvider: UserProvider, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();



      Splashscreen.hide();
      const cloudSettings: CloudSettings = {
        'core': {
          'app_id': '6b601448',
        },
        'push': {
          'sender_id': '126468130105',
          'pluginConfig': {
            'android': {
              'iconColor': '#343434'
            }
          }
        }
      };
      
      this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
        }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
        });
     
      this.push.rx.notification()
        .subscribe((msg) => {
          alert(msg.title + ': ' + msg.text);
        });
        
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
