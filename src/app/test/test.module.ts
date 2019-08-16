import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestPage } from './test.page';
import { SignaturePadModule } from 'angular2-signaturepad';


const routes: Routes = [
  {
    path: '',
    component: TestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SignaturePadModule
  ],
  declarations: [TestPage],
  exports:[
    TestPage
  ]
})
export class TestPageModule {}
