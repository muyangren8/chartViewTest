import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HttpService } from "../services/http.service";
import { ModalController, NavController } from '@ionic/angular';
import { StorageService } from "../services/storage.service";

import { ChartdataComponent } from "../data/chartdata/chartdata.component";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  @ViewChild('echartPie', { static: false }) charts: ElementRef;

  constructor(public http: HttpService, public modalController: ModalController, public nav: NavController, public storage: StorageService) {
    console.log(echarts);

  }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    var token = localStorage.getItem('token');
    var api = '/sso/checkJwt?token=' + token;
    this.http.ajaxGet(api).then((response: any) => {
      console.log(response);
      if (response.data == true) {
        alert('token有效');
      } else {
        this.goToLogin();
      }
    });
  }

  //跳转到登陆界面
  goToLogin() {
    localStorage.setItem('redirect', location.href);
    window.location.href = 'http://localhost:8200/tabs/tab1?order=checkLogin&redirect=' + window.location.origin + '/redirect';
  }

  async showModal() {
    const modal = await this.modalController.create({
      showBackdrop: true,
      cssClass: 'chartCss',
      component: ChartdataComponent,
      //componentProps: { value: 123 }//传值
    });
    await modal.present();

  }

  ionViewDidEnter() {
    this.initCharts();
  }

  initCharts() {
    var ec = echarts as any;
    //var dom = document.getElementById('echartPie');
    var myChart = ec.init(this.charts.nativeElement);
    var ningboJson = 'assets/ningbo.json';
    var jiangbeiJson = 'assets/jiangbei.json';
    var nameMap = "ningbo";
    var optionMap = {
      title: {
        text: '宁波市场份额',
      },

      visualMap: {
        show: true,
        showLabel: true,
        min: 55,
        max: 75,
        text: ['优', '预警'],
        realtime: true,
        calculable: true,
        inRange: {
          color: ['#FF5000', '#FFFD64', 'green']
        }
      },
      series: [{
        type: 'map',
        mapType: nameMap,// 自定义扩展图表类型
        name: '宁波市场大势',
        itemStyle: {
          normal: { label: { show: true } },
          emphasis: { label: { show: true } }
        },
        label: {
          normal: {
            show: true,
            formatter: ['{b}', '{c}%'].join('\n'),
            color: "#fff"
          },
        },
        data: [
          { name: '慈溪市', value: 72.6 },
          { name: '镇海区', value: 60.1 },
          { name: '余姚市', value: 71.7 },
          { name: '江北区', value: 63.2 },
          { name: '海曙区', value: 59.5 },
          { name: '鄞州区', value: 58.3 },
          { name: '北仑区', value: 70.8 },
          { name: '奉化区', value: 69.4 },
          { name: '宁海县', value: 71.0 },
          { name: '象山县', value: 71.1 },
          { name: '洪塘', value: 66 },
          { name: '慈城', value: 77 },
          { name: '甬江', value: 89 },
          { name: '庄桥', value: 78 },
          { name: '城区', value: 80 }
        ]
      }]
    };

    myChart.showLoading();
    this.http.ajaxGet(ningboJson).then((gdMap: any) => {
      myChart.hideLoading();
      echarts.registerMap(nameMap, gdMap);
      myChart.setOption(optionMap, true);
    });

    const clickCity = param => {
      var city: any = '';
      switch (param.name) {
        case '江北区': city = jiangbeiJson; break;
      }
      myChart.showLoading();
      this.http.ajaxGet(city).then((gdMap: any) => {
        myChart.hideLoading();
        echarts.registerMap(nameMap, gdMap);
        myChart.setOption(optionMap, true);
      });
    };

    myChart.on("click", clickCity);
  }
}
