import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast } from 'ionic-native'

import { HomePage } from '../home/home';
import { VerifyPage } from '../verify/verify';

import { UserProvider } from '../../providers/user-provider/user-provider';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

interface UserObj {
  username: string;
  email: string;
  password: string;
  phone: string;
}

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [UserProvider]
})


export class SignupPage {
  signup: {username?: string, password?: string, email?: string, phone?: string} = {};
  public message:any = '';
  submitted = false;

  constructor(private navCtrl: NavController,private userProvider: UserProvider) { }

    onSignup(form) {
    this.submitted = true;

    if (form.valid) {

    this.userProvider.RegisterUser(this.signup).subscribe(
        data => {
        //this.message = data;
        if (data.status = 201) {
          console.log(data);
          Toast.show("Successfully signed up", "short", 'bottom').subscribe(
              toast => {
              console.log(toast);
            }
          );
          this.navCtrl.setRoot(VerifyPage);
        }
        else {
          console.log(data);
          Toast.show("An error occurred during sign up", "short", 'bottom').subscribe(
              toast => {
              console.log(toast);
            }
          );
        }
        // console.log(data.results);
      },
        err => {
        console.log(err);

        Toast.show(err.message, "short", 'bottom').subscribe(
            toast => {
            console.log(toast);
          }
        );
        this.navCtrl.setRoot(HomePage);
      },
      () => console.log("Went back and forth Heroku")
    )
  }


  }

}
