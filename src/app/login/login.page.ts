import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth-service.service';
import { AlertController,MenuController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private signupFormGroup : FormGroup;
  private loginFormGroup : FormGroup;
  loader : any;
  responseData : any;
  userData = {"name":"","ssoId": "", "password":"","email":"","uniqueId":""};
  isLogin = false;

  constructor(private storage: Storage,public authService:AuthService, private menu: MenuController
  , public alertCtrl: AlertController, public formBuilder: FormBuilder,public loadingCtrl: LoadingController,
  public router: Router) { 
    this.signupFormGroup = this.formBuilder.group({
          name: ['',Validators.required],
          ssoId: ['',Validators.required],
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
      this.loginFormGroup = this.formBuilder.group({
            ssoId: ['',Validators.required],
            password: ['',Validators.required]
        });  
  }
  
  validation_messages = {
  'name': [{ type: 'required', message: "This field is required." }],
  'ssoId': [{ type: 'required', message: "This field is required." }],
  'email': [{ type: 'required', message: "This field is required." }],
  'password': [{ type: 'required', message: "This field is required." }],
};

  ngOnInit() {
	this.menu.enable(false);
    this.storage.get('userToken').then((val) => {
      this.authorizeUser(val);
    });
  }
  
  changeLogin(){
    this.isLogin=!this.isLogin;
    this.userData = {"name":"","ssoId": "", "password":"","email":"","uniqueId":""};
  }
  
  loginForm(){
    if(!this.loginFormGroup.valid){
      this.showAlert("Error","Form validation error.");
    }else{
      this.presentLoading();
      this.authService.postData(this.userData,'mobile/login').then((result) => {
      this.responseData = result;
      this.storage.set('welcomeName', this.responseData.name);
      this.storage.set('userToken', this.responseData.uniqueId);
      this.authorizeUser(this.responseData.uniqueId);
    }, (err) => {
      if(err.status==404){
        this.showAlert("Error","Please check your credentials.");
      }
      else{
        this.showAlert("Error","Unexpected error occurred.");
        console.log(err.status);
      }
      this.loader.dismiss();
    });
    }
  }

  signupForm(){
    if(!this.signupFormGroup.valid){
      this.showAlert("Error","Form validation error.");
    }else{
      this.presentLoading();
      this.authService.postData(this.userData,'mobile/create').then((result) => {
      this.responseData = result;
      this.storage.set('welcomeName', this.responseData.name);
      this.storage.set('userToken', this.responseData.uniqueId);
      this.authorizeUser(this.responseData.uniqueId);
    }, (err) => {
      if(err.status==406){
        this.showAlert("Error","Email is already used.");
      }
      else if(err.status==409){
        this.showAlert("Error","Username is already used.");
      }
      else{
        this.showAlert("Error","Unexpected error occurred.");
        console.log(err.status);
      }
      this.loader.dismiss();
    });
    }
  }
  
  authorizeUser(val){
      if(val!=null){
        this.authService.getData('mobile/user/'+val).then((result) => {
		  this.loader.dismiss();
          this.router.navigateByUrl('/home');
      }, (err) => {
		  this.loader.dismiss();
          this.showAlert("Error","Unexpected error occurred.");
      });
    }
  }
  
   async showAlert(t,m){
    let alert = await this.alertCtrl.create({
      header: t,
      message: m,
      buttons: ["OK"]
    });
    await alert.present();
  }
  
  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loader.present();
  }

}
