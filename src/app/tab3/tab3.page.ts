import { Component } from '@angular/core';
import { HttpService } from "../services/http.service";
import { ModalController, NavController } from '@ionic/angular';
import { StorageService } from "../services/storage.service";


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public username: any = '';

  constructor(public http: HttpService, public modalController: ModalController, public nav: NavController, public storage: StorageService) {

  }

  ionViewWillEnter() {
    var info = localStorage.getItem("token").split(".")[1];
    var username = JSON.parse(window.atob(info)).name;
    //var userName = window.atob(info);
    //this.username=this.token;
    this.username = username;
  }

  

  //跳转到登陆界面
  goToLogin() {
    localStorage.setItem("redirect", location.href);
    window.location.href = 'http://localhost:8200/tabs/tab1?order=checkLogin&redirect=' + window.location.origin + '/redirect';
  }

  //注销登陆
  loginOut() {
    var api = '/sso/inValid?token=' + localStorage.getItem('token');
    this.http.ajaxGet(api).then((response: any) => {
      console.log(response);
      if (response.code == 1 && response.data == null) {
        alert('注销成功');
        this.username = '';
        this.storage.remove('token');
      } else {
        alert('注销失败');
      }
    })
  }
}
