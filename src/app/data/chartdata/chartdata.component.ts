import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chartdata',
  templateUrl: './chartdata.component.html',
  styleUrls: ['./chartdata.component.scss'],
})
export class ChartdataComponent implements OnInit {

  @ViewChild('trendBar', { static: false }) trendBar: ElementRef;
  @ViewChild('channelBar', { static: false }) channelBar: ElementRef;
  @ViewChild('douPie', { static: false }) douPie: ElementRef;
  @ViewChild('familyPie', { static: false }) familyPie: ElementRef;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    //this.initTrendBar();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  ionViewDidEnter() {
    console.log("加载了");
    this.initTrendBar();
    this.initChannelBar();
    this.initDouPie();
    this.initFamilyPie();
  }


  initTrendBar() {
    //基于准备好的dom，初始话echarts实例
    var ec = echarts as any;
    var myBar = ec.init(this.trendBar.nativeElement);
    //指定图表的配置项和数据
    var myColor = ['#81E7ED'];
    let positionLeft = 0.4,
      max = 100 + 2 * positionLeft;
    var myColor = ['#4952FF', '#79D0FF', '#FFAB00'];
    var datas11 = [718, 519, 105];

    function getsum(arr) {
      return arr.reduce(function (prev, curr) {
        return prev + curr;
      });
    }
    var sum = getsum(datas11);
    console.log(sum);
    var option = {
      //标题title
      title: {
        text: '大势', //主标题
        textStyle: {
          color: '#000000'
        },
      },
      backgroundColor: '#ffffff',
      tooltip: {
        show: false,
      },
      grid: [{
        width: "70%",
        left: '30%',
        top: '20',
        right: '0',
        bottom: '0'
      }
      ],
      xAxis: [{
        gridIndex: 0,
        show: false,
      }],
      yAxis: [{
        gridIndex: 0,
        axisTick: 'none',
        axisLine: 'none',
        offset: '10',
        axisLabel: {
          textStyle: {
            color: '#000000',
            fontSize: '14',
          }
        },
        data: ['移动日通份额', '电信日通份额', '联通日通份额']
      }, {
        gridIndex: 0,
        splitLine: 'none',
        axisTick: 'none',
        axisLine: 'none',
        data: datas11,
        axisLabel: {
          show: false,
        },
      }, {
        gridIndex: 0,
        splitLine: 'none',
        axisTick: 'none',
        axisLine: 'none',
        data: []
      }
      ],
      series: [{
        name: '值',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: datas11,
        //barCategoryGap:'60%',
        label: {
          normal: {
            show: true,
            position: 'right',
            verticalAlign: 'right',
            offset: [0, -5],
            color: function (params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num]
            },
            fontSize: 14,
            fontFamily: 'arial',
            formatter: function (item) {
              return (item.value / sum * 100).toFixed(2) + '%'
            }
          }
        },
        barWidth: 20,
        barGap: '100%',
        itemStyle: {
          normal: {
            color: function (params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num]
            },
            barBorderRadius: 5,

          }
        },
        z: 2
      },
      {
        name: '外框',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 2,
        barGap: '-100%',
        data: [sum, sum, sum],
        barCategoryGap: '60%',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: function (params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num]
            },
            opacity: .2,
            barBorderRadius: 5,
          }
        },
        z: 0
      }]
    };
    //使用刚刚指定的配置项和数据显示图表
    myBar.setOption(option);

  }

  initChannelBar() {
    //基于准备好的dom，初始话echarts实例
    var ec = echarts as any;
    var myBar = ec.init(this.channelBar.nativeElement);
    //指定图表的配置项和数据

    var option = {
      title: {
        text: '渠道', //主标题
        textStyle: {
          color: '#000000'
        },
      },
      grid: {
        width: "70%",
        left: '10',
        top: '20',
        right: '20',
        bottom: '0'
      },
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
        type: 'category',
        show: false
      },
      series: [
        {
          name: '移动',
          data: [74],
          type: 'bar',
          stack: '总量',
          barWidth: 20,
          cursor: 'default',
          itemStyle: { borderWidth: 3, borderStyle: 'solid', borderColor: '#FFFFFF', color: '#16A9E6' },
          label: {
            show: true, padding: [0, 0, 40, 0], fontSize: 14, color: '#333333', formatter($data) {
              return '移动：' + Math.abs($data.data).toFixed(2) + '%'
            }
          },
        },
        {
          name: '友商',
          data: [26],
          type: 'bar',
          stack: '总量',
          barWidth: 20,
          cursor: 'default',
          itemStyle: { borderWidth: 3, borderStyle: 'solid', borderColor: '#FFFFFF', color: '#05A07D' },
          label: {
            show: true, padding: [0, 0, 40, 0], fontSize: 14, color: '#333333', formatter($data) {
              return '友商：' + Math.abs($data.data).toFixed(2) + '%'
            }
          },

        }
      ]
    };

    //使用刚刚指定的配置项和数据显示图表
    myBar.setOption(option);
  }

  initDouPie() {
    var data = [
      {
        name: '4G渗透率',
        value: 84
      }, {
        name: '70元以上流量包用户占比',
        value: 49.7
      }]

    var titleArr = [], seriesArr = [];
    var colors = [['#389af4', '#dfeaff'], ['#ff8c37', '#ffdcc3']]
    data.forEach(function (item, index) {
      titleArr.push(
        {
          text: item.name,
          left: index * 50 + 25 + '%',
          top: '80%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '12',
            color: colors[index][0],
            textAlign: 'center',
          },
        }
      );
      seriesArr.push(
        {
          name: item.name,
          type: 'pie',
          clockWise: false,
          radius: [30, 40],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
            }
          },
          hoverAnimation: false,
          center: [index * 50 + 25 + '%', '50%'],
          data: [{
            value: item.value,
            label: {
              normal: {
                formatter: function (params) {
                  return params.value + '%';
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold',
                  color: colors[index][0]
                }
              }
            },
          }, {
            value: 100 - item.value,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: colors[index][1]
              },
              emphasis: {
                color: colors[index][1]
              }
            }
          }]
        }
      )
    });
    //基于准备好的dom，初始话echarts实例
    var ec = echarts as any;
    var myBar = ec.init(this.douPie.nativeElement);
    //指定图表的配置项和数据
    var option = {
      //标题title
      title: {
        text: '流量', //主标题
        textStyle: {
          color: '#000000'
        },
      },
      grid: {
        width: "70%",
        left: '10',
        top: '20',
        right: '20',
        bottom: '0'
      },
      backgroundColor: "#fff",
      //title: titleArr,
      series: seriesArr,
      graphic: {
        elements: [{
          type: 'text',
          left: '11%',
          bottom: '10%',
          z: 100,
          style: {
            text: '4G渗透率',
            textAlign: 'middle',
            fill: '#389af4'
          }
        },
        {
          type: 'text',
          left: '52%',
          bottom: '10%',
          z: 100,
          style: {
            text: '70元以上流量包\n用户占比',
            textAlign: 'middle',
            fill: '#ff8c37'
          }
        }
        ]
      }
    }
    //使用刚刚指定的配置项和数据显示图表
    myBar.setOption(option);
  }

  initFamilyPie() {
    var data = [
      {
        name: '3个月内到期用户数',
        value: 9.88
      }, {
        name: '宽带实装率',
        value: 29.4
      }]

    var titleArr = [], seriesArr = [];
    var colors = [['#fd6f97', '#fd6f97'], ['#a181fc', '#e3d9fe']]
    data.forEach(function (item, index) {
      titleArr.push(
        {
          text: item.name,
          left: index * 50 + 25 + '%',
          top: '80%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '12',
            color: colors[index][0],
            textAlign: 'center',
          },
        }
      );
      seriesArr.push(
        {
          name: item.name,
          type: 'pie',
          clockWise: false,
          radius: [30, 40],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
            }
          },
          hoverAnimation: false,
          center: [index * 50 + 25 + '%', '50%'],
          data: [{
            value: item.value,
            label: {
              normal: {
                formatter: function (params) {
                  if (index == 0) {
                    return params.value + '万';
                  } else {
                    return params.value + '%';
                  }
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold',
                  color: colors[index][0]
                }
              }
            },
          },
          {
            value: 100 - item.value,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: colors[index][1]
              },
              emphasis: {
                color: colors[index][1]
              }
            }
          }]
        }
      )
    });
    //基于准备好的dom，初始话echarts实例
    var ec = echarts as any;
    var myBar = ec.init(this.familyPie.nativeElement);
    //指定图表的配置项和数据
    var option = {
      //标题title
      title: {
        text: '家庭', //主标题
        textStyle: {
          color: '#000000'
        },
      },
      grid: {
        width: "70%",
        left: '10',
        top: '20',
        right: '20',
        bottom: '0'
      },
      backgroundColor: "#fff",
      series: seriesArr,
      graphic: {
        elements: [{
          type: 'text',
          left: '11%',
          bottom: '10%',
          z: 100,
          style: {
            text: '3个月内\n到期用户数',
            textAlign: 'middle',
            fill: '#fd6f97'
          }
        },
        {
          type: 'text',
          left: '60%',
          bottom: '10%',
          z: 100,
          style: {
            text: '宽带实装率',
            textAlign: 'middle',
            fill: '#a181fc'
          }
        }
        ]
      }
    }
    //使用刚刚指定的配置项和数据显示图表
    myBar.setOption(option);
  }

}
