
/**
 * 折线统计图
 * @author 汪小岗
 * @date 2019-03-08
*/
function getEchart (ele, eleChart, data, user) {
  // ele: 文本元素 eleChart: echart实例化元素 data: json数据, user: 名称
  let _data = data;
  let _echartStyle = {
        grid: {
          show: false,
        },
        x: {
          xLineColor: '#bdbabd',
          textColor: '#281a4f',
        },
        y: {
            yLineColor: '#bdbabd',
        textColor: '#281a4f',
        },
        smooth: true,
        symbol: 'circle',
        symbolSize: 9,
        // symbolStyle: {
        //   color: '#4e87ae',  // 曲线颜色
        //   borderColor: '#5e41ac',
        //   borderWidth: 1,
        //   borderType: 'solid',
        // },
  };

  let xData = [];
  let yData = [];
  let total = 0;

  for(var key in _data) {
    xData.push(key);
    yData.push(_data[key]);
  }

  yData.forEach((v) => {
    total += (v.he + v.she) / 2;
  })

  ele.innerHTML = `${ user }得分(${ total })`;

  eleChart.setOption({
      tooltip: {
        show: true,
        trigger: 'axis',
        textStyle: {
          fontSize: 10,
          fontWeight: 'lighter',
        },
        axisPointer: {
          type: 'cross',
        },
        formatter: 'He: {c0} 分<br />She: {c1} 分',
        // backgroundColor: 'red', // 提示框背景色
        padding: [5, 10]
      },
      grid: { // 根据网格大小可以指定图形大小
        show: _echartStyle.grid.show,
        width: '70%',
        height: '60%',
        // containLabel: true,
        // backgroundColor: _echartStyle.grid.backgroundColor,
      },
      xAxis: {
        data: xData.map(function (item) {
            return item;
        }),
        type: 'category',
        axisLine: {
          lineStyle: {
            color: _echartStyle.x.xLineColor, // X轴轴线颜色
          },
        },
        axisLabel: {
          textStyle: {
            color: _echartStyle.x.textColor, // X轴文字颜色
            fontSize: 12,
            fontFamily: 'PingFangSC-Light',
          },
        },
        axisTick: {
          show: false,  // 是否显示刻度线
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
              // 使用深浅的间隔色
              color: '#F5F7F8', // Y轴网格线颜色
            }
        },
        axisLine: {
          lineStyle: {
            color: _echartStyle.y.yLineColor, // Y轴轴线颜色
          },
        },
        axisLabel: {
          textStyle: {
            color: _echartStyle.y.textColor,
            fontSize: 12,
            fontFamily: 'PingFangSC-Light',
          }
        },
        axisTick: {
          show: false,  // 是否显示刻度线
        },
      },
      series: [
        {
          type: 'line',
          data: yData.map(function (item) {
              return item.he;
          }),
          smooth: _echartStyle.smooth,
          showSymbol: false,
          // hoverAnimation: false,
          // symbol: _echartStyle.symbol, // 拐点类型
          // symbolSize: _echartStyle.symbolSize, // 拐点大小
          itemStyle: {  // 设置曲线上点的样式
            normal: {
              color: '#64caf9',  // 曲线颜色
              borderColor: '#64caf9',
              borderWidth: 1,
              borderType: 'solid',
            },
            // normal: _echartStyle.symbolStyle,
          },
          areaStyle: {  // 填充颜色
              normal: {
                  color: "#64caf9",
                  opacity: 0.2
              }
          },
        },
        {
          type: 'line',
          data: yData.map(function (item) {
              return item.she;
          }),
          smooth: _echartStyle.smooth,
          showSymbol: false,
          // hoverAnimation: false,
          // symbol: _echartStyle.symbol, // 拐点类型
          // symbolSize: _echartStyle.symbolSize, // 拐点大小
          itemStyle: {  // 设置曲线上点的样式
            normal: {
              color: '#FF7CAC',  // 曲线颜色
              borderColor: '#FF7CAC',
              borderWidth: 1,
              borderType: 'solid',
            },
            // normal: _echartStyle.symbolStyle,
          },
          areaStyle: {  // 填充颜色
              normal: {
                  color: "#FF7CAC",
                  opacity: 0.2
              }
          },
        },
      ],
  });

  // 自适应窗口
  window.addEventListener("resize", () => { eleChart.resize();});
}


/**
 * 条形统计图
 * @author 汪小岗
 * @date 2019-03-08
*/
function getBlockChart(ele, eleChart, data, user) {

  let dataHe = [];
  let dataShe = [];
  let xData = [];
  let total = 0;

  for(var key in data) {
    xData.push(key);
    dataHe.push(data[key]['he']);
    dataShe.push(data[key]['she']);
    total += (data[key]['he'] + data[key]['she']) / 2;
  }

  ele.innerHTML = `${ user }得分(${ total })`;

  eleChart.setOption({
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['Time', ...xData],
            ['他', ...dataHe],
            ['她', ...dataShe]
        ]
    },
    xAxis: [
        {
          type: 'category',
          gridIndex: 0,
          nameTextStyle: {
            color: '#4990e2',
            fontSize: '14px'
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
    ],
    yAxis: [
        {
          gridIndex: 0,
          splitLine: {
            show: false
          }
        },
    ],
    grid: [
        {width: '70%'},
        {height: '100%'}
    ],
    series: [
        // These series are in the first grid.
        {
          type: 'bar',
          seriesLayoutBy: 'row',
          itemStyle: {
            color: '#64caf9'
          },
          barWidth: '16px'
        },
        {
          type: 'bar',
          seriesLayoutBy: 'row',
          itemStyle: {
            color: '#FF7CAC'
          },
          barWidth: '16px'
        },
    ]
  });
}
