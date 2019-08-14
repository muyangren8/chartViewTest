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

  constructor(public http: HttpService, public storage: StorageService, public nav: NavController) {
  }

  ngOnInit() {
    console.log(this.storage.get("cid"));
  }

  back(){
    this.nav.navigateBack("/tabs/tab2");
  }
}
