import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { AlertController,LoadingController,ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  loader : any;
  sessionId: any;
 
  constructor(public route: ActivatedRoute,public authService:AuthService, private storage: Storage
  ,public loadingCtrl: LoadingController, public alertCtrl: AlertController,private toastCtrl: ToastController) { }
  
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
  
  async dismissLoading() {
	  if(this.loader){
		  await this.loader.dismiss();
	  }
  }

  async presentToast(m) {
  const toast = await this.toastCtrl.create({
    message: m,
	showCloseButton: true,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
  }
}
