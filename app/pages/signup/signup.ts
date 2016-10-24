import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast } from 'ionic-native';

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
  login: {emailLogin?: string, passwordLogin?: string} = {};
  userObject:{email?: string, password?:string} = {};

  public message:any = '';
  submitted = false;
  submitLogin = false;

  constructor(private navCtrl: NavController,private userProvider: UserProvider) { }

  onLogin(form){
    console.log("The details in the form is " + form);
    this.submitLogin = true;

    if(form.valid)
    {

      this.userObject.email = this.login.emailLogin;
      this.userObject.password = this.login.passwordLogin;

      this.userProvider.LoginUser(this.userObject).subscribe(
        data => {
          console.log(data);
          if(data.status == 200){
            this.navCtrl.setRoot(HomePage);

            this.userProvider.SetLocalObject("user", this.login.emailLogin);

            Toast.show("Login was successful.", "short", 'bottom').subscribe(
                toast => {
                console.log(toast);
              }
            );
          }
        },
        err => {
          console.log(err);

          Toast.show(err.message, "short", 'bottom').subscribe(
              toast => {
              console.log(toast);
            }
          );
        },
        () => console.log("Went back and forth for Login")
      )
    }


  }

    onSignup(form) {
    this.submitted = true;

    if (form.valid) {

    this.userProvider.RegisterUser(this.signup).subscribe(
        data => {
        //this.message = data;
        if (data.status == 201) {
          console.log(data);
          Toast.show("Successfully signed up", "short", 'bottom').subscribe(
               toast => {
               console.log(toast);
             }
          );
          this.navCtrl.push(VerifyPage,{
            username : this.signup.username,
            email : this.signup.email
          });
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

      },
      () => console.log("Went back and forth Heroku RegisterUser")
    )
  }


  }

    setLocalUser(userObject){
      this.userProvider.SetLocalObject("user", userObject);
    }
}
