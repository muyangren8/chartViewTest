import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { NavController } from "@ionic/angular";
import { StorageService } from "../services/storage.service";


@Component({
  selector: 'app-sign-pad',
  templateUrl: './sign-pad.page.html',
  styleUrls: ['./sign-pad.page.scss'],
})
export class SignPadPage {

  @ViewChild(SignaturePad, { static: false }) signaturePad: SignaturePad;

  private signImage: any = '';

  private signaturePadOptions: Object = {
    'maxWidth': 1,
    'minWidth': 1,
    'canvasWidth': 350,
    'canvasHeight': 300,
  };

  constructor(public nav: NavController, public storage: StorageService) {
  }

  ionViewWillEnter() {
    console.log('进入了Sign-Pad');
    this.signImage = this.storage.get('signImageFlag');
  }

  drawStart() {
    console.log('drawStart');
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
    this.storage.set(this.signImage, this.signaturePad.toDataURL());
    this.nav.navigateRoot('/sign-page');
    this.signaturePad.clear;
  }

  clear() {
    this.storage.remove(this.signImage);
    this.signaturePad.clear();
  }


  drawCancel() {
    this.signaturePad.clear();
    this.nav.navigateRoot('/sign-page');
  }
}
