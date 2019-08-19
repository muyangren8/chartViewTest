import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignPadPage } from './sign-pad.page';
import { SignaturePadModule } from 'angular2-signaturepad';


const routes: Routes = [
  {
    path: '',
    component: SignPadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SignPadPage]
})
export class SignPadPageModule {}
