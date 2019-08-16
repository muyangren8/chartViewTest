import { Component, OnInit,ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';//引入手写板
import { NavController, NavParams } from "@ionic/angular";


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  @ViewChild(SignaturePad,{static:false}) public signaturePad: SignaturePad; //第二视图
  signatureImage: string; //定义类型
  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 220,
    'canvasHeight': 120
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionnairePage');
  }
  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }
  // 清除模板
  drawClear() {
    this.signaturePad.clear();
  }
  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 2);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }
  
  // 完成生成图片
  drawComplete(sign) {
    this.signatureImage = this.signaturePad.toDataURL();
    console.log(this.signatureImage);
  }

}
