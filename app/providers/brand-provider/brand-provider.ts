import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



/*
  Generated class for the Brands provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BrandProvider {
  
   url:string = 'https://shoppa.herokuapp.com/brands/';
  
   headers =  new Headers({'Content' : 'application/json'});
   options = new RequestOptions({ headers : this.headers});
  
  constructor(private http: Http) {}
  
  GetBrands(){
    
    var response = this.http.get(this.url , this.options)
      .map(res => res.json());
      
      return response;
  }
  
  LikeBrand(email){
    var response = this.http.post(this.url + 'like', email, this.options)
    .map(res=> res.json());
    
    return response;
  }

  

}

