import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	
  welcomeName : any;
  constructor(public router: Router, private storage: Storage, private menu: MenuController) { 
    this.menu.enable(true);
    this.storage.get('welcomeName').then((val) => {
      this.welcomeName = val;
    });
  }
  
  openQrPage() {
    this.router.navigateByUrl('/qr');
  }
  
  openResultPage(){
	  var text = "abc";
	  this.router.navigateByUrl('/result/'+text);
  }
  
  logout(){
	  this.storage.remove('welcomeName');
	  this.storage.remove('userToken');
	  this.router.navigateByUrl('/login');
  }

}

