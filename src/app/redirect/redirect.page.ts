import { Component, OnInit } from '@angular/core';
import { StorageService } from "../services/storage.service";
import { HttpService } from "../services/http.service";


@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.page.html',
  styleUrls: ['./redirect.page.scss'],
})
export class RedirectPage {

  constructor(public storage: StorageService, public http: HttpService) { }

  ionViewWillEnter() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //本页面用于回调中转
    var token = this.getUrlParam("token");
    localStorage.setItem("token", token);
    
    //this.event.eventEmit.emit('message');
    location.replace(localStorage.getItem("redirect"));
  }

 

  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }

}
