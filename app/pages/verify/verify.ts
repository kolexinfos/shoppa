import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast } from 'ionic-native'

import { HomePage } from '../home/home';

import { UserProvider } from '../../providers/user-provider/user-provider';

/*
  Generated class for the VerifyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/verify/verify.html',
  providers: [UserProvider]
})
export class VerifyPage {

  verify: {code?:number, email?:string }= {};
  submitted = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private userProvider: UserProvider) {

  }

  verifyEmail(form){
      this.submitted = true;

      this.verify.email = this.navParams.get('email');
      console.log(this.verify);

      if (form.valid) {
        this.userProvider.verifyEmail(this.verify).subscribe(
          data => {
            console.log(data);
            if(data.status == 201){
              this.navCtrl.setRoot(HomePage);

              this.userProvider.SetLocalObject("user",this.verify.email);

              Toast.show("Token was verified successfully", "short", 'bottom').subscribe(
                   toast => {
                   console.log(toast);
                 }
              );
            }
            else{

            }
          },
          err => {
            console.log(err);
            Toast.show("There was an error during token verification, please try again later", "short", 'bottom').subscribe(
                 toast => {
                 console.log(toast);
               }
            );
          },

          () => console.log("Went back and forth Heroku for verifyEmail")
          )
      }


  }

}
