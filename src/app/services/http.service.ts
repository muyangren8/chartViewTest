import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public httpclient: HttpClient) { }

  ajaxGet(url: any) {
    return new Promise((resove, reject) => {
      this.httpclient.get(url).subscribe((response) => {
        resove(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  ajaxPost(url: string, json: object) {
    return new Promise((resove, reject) => {
      this.httpclient.post(url, json).subscribe((response) => {
        resove(response);
      }, (err) => {
        reject(err);
      });
    });
  }

}
