import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: 'qr.page.html',
  styleUrls: ['qr.page.scss']
})
export class QrPage {
  constructor(public alertController: AlertController,public qrScanner: QRScanner, public router: Router) {
	this.qrscanner();
  }


  qrscanner() {
  this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.qrScanner.hide();
          scanSub.unsubscribe();
		  this.router.navigateByUrl('/result/'+text);		  
        });
        this.qrScanner.resumePreview();
        this.qrScanner.show()
        .then((data : QRScannerStatus)=> {
        },err => {
          this.showAlert('Error','Unexpected error occurred.');
        });
      } else if (status.denied) {
        this.showAlert('Error','Permission is denied.');
      } else {
        this.showAlert('Error','Unexpected error occurred.');
      }
    })
    .catch((e: any) => {
      this.showAlert('Error','Unexpected error occurred.');
    });
	}
	
   async showAlert(t,m){
    let alert = await this.alertController.create({
      header: t,
      message: m,
      buttons: ["OK"]
    });
    await alert.present();
  }
}
