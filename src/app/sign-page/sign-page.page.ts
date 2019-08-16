import { Component, OnInit } from '@angular/core';
import { HttpService } from "../services/http.service";
import { StorageService } from "../services/storage.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.page.html',
  styleUrls: ['./sign-page.page.scss'],
})
export class SignPagePage implements OnInit {

  private gname: any = "";
  private cname: any = "";
  private gid: any = this.storage.get("gid");
  private cid: any = this.storage.get("cid");
  private mid: any = this.storage.get("mid");
  private sign: any = {
    mid: "",
    gid: "",
    gname: "",
    cid: "",
    cname: "",
    planStartDate:{},
    planEndDate:{},
    signDateA:{},
    signDateB:{}
  }

  constructor(public http: HttpService, public storage: StorageService, public nav: NavController) {
    this.sign.signDateA=new Date().toISOString();
    this.sign.signDateB=new Date().toISOString();
  }

  ngOnInit() {
    this.initName();
  }

  initName() {
    this.http.ajaxGet("/sign/company/getCompanyById?id=" + this.gid).then((response: any) => {
      console.log(response);
      if (response.status == 200) {
        this.gname = response.data.gname;
      } else {
        alert(response.msg);
      }
    });
    this.http.ajaxGet("/sign/cust/getCustById?id=" + this.cid).then((response: any) => {
      console.log(response);
      if (response.status == 200) {
        this.cname = response.data.cname;
      } else {
        alert(response.msg);
      }
    });
  }

  back() {
    this.nav.navigateBack("/tabs/tab2");
  }
}
