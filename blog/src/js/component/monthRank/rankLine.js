import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';
import { hashHistory } from 'react-router';

import $ from 'jquery';
import echarts from 'echarts';

class RankLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  componentWillReceiveProps(nextprops) {

    let { data, username, canvasId } = nextprops;
    let echartLine = document.getElementById(`${ canvasId }`);
		let chart = echarts.init(echartLine);

		this._getEchart(chart, data, username);
  }

  componentDidMount() {

    let { data, username, canvasId } = this.props;
    let echartLine = document.getElementById(`${ canvasId }`);
		let chart = echarts.init(echartLine);

		this._getEchart(chart, data, username);
  }

  /**
   * 折线统计图
   * @author 汪小岗
   * @date 2019-03-08
  */
  _getEchart = (eleChart, data, username) => {
    // eleChart: echart实例化元素 data: json数据, user: 名称

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
    };

    let xData = [];
    let yData = [];
    let total = 0;

    data.forEach((v) => {

      xData.push(v.index);
      yData.push(v.data);
    })

    yData.forEach((v) => {
      total += (v.he + v.she) / 2;
    })

    this.setState({ total: total });

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
          width: '95%',
          height: '60%',
          left: '20px'
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


  render() {
    let {
      canvasId,
      canvasStyle,
      username,
      usernameStyle
    } = this.props;

    return (
      <div className = "echartLine">
        <div className = 'username' style = { usernameStyle }>
          { username }平均得分: &nbsp;
          <span className = 'score'>{ this.state.total }</span>
        </div>
        <div className = "container">
          <div className = "inner">
            <div id = { canvasId } style = { canvasStyle } />
          </div>
        </div>
      </div>
    );
  }
}

export default RankLine;
