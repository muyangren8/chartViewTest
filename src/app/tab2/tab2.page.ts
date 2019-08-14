import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HttpService } from "../services/http.service";
import { StorageService } from "../services/storage.service";
import { NavController } from "@ionic/angular";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private mid: any = 1;
  private gid: any = "";
  private cid: any = "";
  private companys: any;
  private custs: any;

  @ViewChild("signBtn",{static:false}) signBtn;

  constructor(public http: HttpService, public storage: StorageService, public nav: NavController) {
  }

  ngOnInit(): void {
    this.initCompany();
  }

  initCompany() {
    this.http.ajaxGet("/sign/company/getCompanyList?mid=" + this.mid).then((response: any) => {
      console.log(response);
      this.companys = response;
    });
  }

  initCust() {
    this.http.ajaxGet("/sign/cust/getCustList?gid=" + this.gid).then((response: any) => {
      console.log(response);
      this.custs = response;
    });
  }

  hasCid(){
    if(this.cid!=null){
      this.signBtn.disabled=false;
    }else{
      this.signBtn.disabled=true;
    }
  }

  toSign() {  
      this.storage.set("cid", this.cid);
      this.nav.navigateForward("/sign-page");
  }
}
