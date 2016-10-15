import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LocalStorage , Storage } from 'ionic-angular';
import 'rxjs/add/operator/map';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  url:string = 'https://shoppa.herokuapp.com/users/';
  constructor(private http: Http) {}


  RegisterUser(userObject){

    let headers =  new Headers({'Content' : 'application/json'});
    let options = new RequestOptions({ headers : headers});

    var response = this.http.post(this.url + 'register',userObject, options);
    return response;
  }

  GetLocalObject(objName){
    return window.localStorage.getItem(objName);

  }

  SetLocalObject(objName, object){
    window.localStorage.setItem(objName, object);
  }

  verifyEmail(verify){
    console.log(verify);

    let headers =  new Headers({'Content' : 'application/json'});
    let options = new RequestOptions({ headers : headers});

    var response = this.http.post(this.url + 'verifyEmail',verify, options);
    return response;
  }

  LoginUser(userObject){
    let headers =  new Headers({'Content' : 'application/json'});
    let options = new RequestOptions({ headers : headers});

    var response = this.http.post(this.url + 'authenticate', userObject, options);
    return response;
  }

}

