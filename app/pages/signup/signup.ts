import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast } from 'ionic-native'

import { HomePage } from '../home/home';

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

  public message:any = '';

  constructor(private navCtrl: NavController,private userProvider: UserProvider) {

  }

  startApp() {
    //this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  getCampaigns(){
    let userObject : UserObj = ({
      username: 'kolexinfos',
      email : 'kolexinfos@gmail.com',
      password : 'abc123',
      phone : '07062067512'
    });

    this.userProvider.RegisterUser(userObject).subscribe(
      data => {
       //this.message = data;
        if (data.status = 201){
          console.log(data);
          Toast.show("Successfully Sign up", "short", 'bottom').subscribe(
              toast => {
              console.log(toast);
            }
          );
          this.navCtrl.setRoot(HomePage);
        }
        else{
          console.log(data.status);
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

    //this.service.getCampaigns("The signup page rocks");
  }

}
