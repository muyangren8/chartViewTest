import { Component, OnInit } from '@angular/core';
import { HttpService } from "../services/http.service";
import { StorageService } from "../services/storage.service";
import { NavController, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.page.html',
  styleUrls: ['./sign-page.page.scss'],
})

export class SignPagePage implements OnInit {
  private token: any = '';
  private gname: any = '';
  private cname: any = '';
  private gid: any = this.storage.get("gid");
  private cid: any = this.storage.get("cid");
  private mid: any = this.storage.get("mid");
  private sign: any = {
    mid: '',
    gid: '',
    gname: '',
    cid: '',
    cname: '',
    planStartDate: '',
    planEndDate: '',
    signDateA: '',
    signDateB: '',
    signatureImageA: '',
    signatureImageB: '',
  }

  constructor(public http: HttpService, public storage: StorageService,
    public nav: NavController, public modal: ModalController) {
    this.token = localStorage.getItem('token');

    this.sign.signDateA = new Date().toISOString();
    this.sign.signDateB = new Date().toISOString();
    //this.sign.signatureImage = this.storage.get('signatureImage');
  }

  ionViewWillEnter() {
    console.log('进入了');
    this.sign.signatureImageA = this.storage.get('signatureImageA');
    //console.log(this.sign.signatureImageA);
    this.sign.signatureImageB = this.storage.get('signatureImageB');
  }

  ngOnInit() {
    this.initName();
  }

  initName() {
    this.http.ajaxGet("/sign/company/getCompanyById?id=" + this.gid + "&token=" + this.token).then((response: any) => {
      console.log(response);
      if (response.status == 200) {
        this.gname = response.data.gname;
      } else if (response.status == -1) {
        alert(response.msg);
        localStorage.setItem('redirect', window.location.origin + '/tabs/tab2');
        window.location.href = 'http://localhost:8200/tabs/tab1?order=checkLogin&redirect=' + window.location.origin + '/redirect';
      }
      else {
        alert(response.msg);
      }
    });
    this.http.ajaxGet("/sign/cust/getCustById?id=" + this.cid + "&token=" + this.token).then((response: any) => {
      console.log(response);
      if (response.status == 200) {
        this.cname = response.data.cname;
      } else if (response.status == -1) {
        alert(response.msg);
        localStorage.setItem('redirect', window.location.origin + '/tabs/tab2');
        window.location.href = 'http://localhost:8200/tabs/tab1?order=checkLogin&redirect=' + window.location.origin + '/redirect';
      }
      else {
        alert(response.msg);
      }
    });
  }

  back() {
    this.nav.navigateBack('/tabs/tab2');
  }

  toSignA() {
    this.nav.navigateForward('/sign-pad');
    this.storage.set('signImageFlag', 'signatureImageA');
  }

  toSignB() {
    this.nav.navigateForward('/sign-pad');
    this.storage.set('signImageFlag', 'signatureImageB');
  }

  doSign() {
    //补充字段
    this.sign.cid = this.mid;
    this.sign.cname = this.cname;
    this.sign.gid = this.gid;
    this.sign.gname = this.gname;
    this.sign.mid = this.mid;
    console.log(this.sign);

    this.http.ajaxPost('/sign/sign/doSign', this.sign).then((responese: any) => {
      console.log(responese);
      if (responese.status == 200) {
        alert('协议签订成功');
        this.nav.navigateRoot('/tabs/tab2');
      } else {
        alert('协议签订失败');
      }
    });

    //清除localStorage
    this.storage.remove('signImageFlag');
    this.storage.remove('signatureImageA');
    this.storage.remove('signatureImageB');
  }
}
