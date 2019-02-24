import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

let apiDeviceUrl = 'http://192.168.0.11:8080/rest/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http : Http) { }
  
    postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json' );
	    //let options = new RequestOptions({method: RequestMethod.Post,headers: headers});
      this.http.post(apiDeviceUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  
	getData(type){
	  return new Promise((resolve, reject) => {
		this.http.get(apiDeviceUrl+type)
		.subscribe(res => {
		  resolve(res.json());
		}, (err) => {
		  reject(err);
		});
	  });
	}
}
