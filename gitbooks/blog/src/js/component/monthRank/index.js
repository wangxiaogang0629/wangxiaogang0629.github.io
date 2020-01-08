import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';
import { hashHistory } from 'react-router';

import $ from 'jquery';
import echarts from 'echarts';

class RankBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  componentWillReceiveProps(nextprops) {

    let { data, username, canvasId } = nextprops;
		let echartBox = document.getElementById(`${ canvasId }`);
		let sheBlockChart = echarts.init(echartBox);

		this._getBlockChart(sheBlockChart, data, username);
  }


  componentDidMount() {

    let { data, username, canvasId } = this.props;
		let echartBox = document.getElementById(`${ canvasId }`);
		let sheBlockChart = echarts.init(echartBox);

		this._getBlockChart(sheBlockChart, data, username);
  }

  /**
   * 条形统计图
   * @author 汪小岗
   * @date 2019-03-08
  */
  _getBlockChart = (eleChart, data, username) => {

    let _data = [];
    let xData = [];
    let total = 0;
    let _blockY = {
      type: 'bar',
      seriesLayoutBy: 'row',
      itemStyle: {
        color: this.props.blockBg,
      },
      barWidth: '14px'
    };

    data.forEach((v) => {
      xData.push(v.index);
      _data.push(v.data);
      total += v.data;
    });

    this.setState({ total: total });
    let _block = [['Time', ...xData],[`${ username }`, ..._data]]

    eleChart.setOption({
      legend: {},
      tooltip: {},
      dataset: {
          source: [..._block]
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
          { width: '95%', left: '25px' },
      ],
      series: [ _blockY ]
    });
  }


  render() {
    let {
      canvasId,
      canvasStyle,
      usernameStyle,
      username
    } = this.props;

    return (
      <div className = "echartblock">
        <div className = "container">
          <div className = 'username' style = { usernameStyle }>
            { username }个人得分: &nbsp;
            <span className = 'score'>{ this.state.total }</span>
          </div>
          <div className = "inner">
            <div id = { canvasId } style = { canvasStyle }></div>
          </div>
        </div>
      </div>
    );
  }
}



export default RankBlock;
