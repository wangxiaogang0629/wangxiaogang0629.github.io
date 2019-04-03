import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';
import { hashHistory } from 'react-router';
import RankBlock from '../../component/monthRank';
import RankLine from '../../component/monthRank/rankLine';
import DateSelect from '../../component/dateSelect';
import Data from '../../../../data/rankData2019';
import assign from 'lodash.assign';

import $ from 'jquery';

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectYear: 2019,
      selectMonth: 4
    };
  }

  componentDidMount() {
    // this._getCurrentCity();
  }

  _changeDateMonth = (value, text) => {
    this.setState({
      selectMonth: text
    })
  }

  _changeDateYear = (value, text) => {
    this.setState({
      selectYear: text
    })
  }

  render() {
    let {
    } = this.props;

    let {
      selectYear,
      selectMonth
    } = this.state;


    let _heData = Data.heData[`${selectYear}`]
                   ? Data.heData[`${selectYear}`][`${selectMonth}`]
                   : '';
    let _sheData = Data.sheData[`${selectYear}`]
                   ? Data.sheData[`${selectYear}`][`${selectMonth}`]
                   : '';
    let _rankBlockDataHe = [];
    let _rankBlockDataShe = [];
    let _rankLineDataHe = [];
    let _rankLineDataShe = [];

    if (_heData && _sheData) {

      _heData.map((v) => {
        _rankBlockDataHe.push({ index: v.time, data: v.he });
        _rankLineDataHe.push({ index: v.time, data: { he: v.he, she: v.she } });
      })

      _sheData.map((v) => {
        _rankBlockDataShe.push({ index: v.time, data: v.she });
        _rankLineDataShe.push({ index: v.time, data: { he: v.he, she: v.she } });
      })

    }

    return (
      <div className = "me">

        <div className = 'rankTitle'>
          { selectYear } 年 { selectMonth } 月 考核分数统计
        </div>

        <div style = { styles.dateSelectStyle }>
          <DateSelect
            containerStyle = { { width: 120 } }
            selectValue = { selectYear }
            change = {
              (value, text) => { this._changeDateYear(value, text) } }>
            <div value = { 2018 }>2018</div>
            <div value = { 2019 }>2019</div>
            <div value = { 2020 }>2020</div>
          </DateSelect>
          <div style = { styles.dateUnit }>年</div>
          <DateSelect
            containerStyle = { { width: 60 } }
            selectValue = { selectMonth }
            change = {
              (value, text) => { this._changeDateMonth(value, text) } }>
            <div value = {1}>1</div>
            <div value = {2}>2</div>
            <div value = {3}>3</div>
            <div value = {4}>4</div>
            <div value = {5}>5</div>
            <div value = {6}>6</div>
            <div value = {7}>7</div>
            <div value = {8}>8</div>
            <div value = {9}>9</div>
            <div value = {10}>10</div>
            <div value = {11}>11</div>
            <div value = {12}>12</div>
          </DateSelect>
          <div style = { assign({}, styles.dateUnit, {
            marginRight: 0
          }) }>月</div>
        </div>

        {
          _heData
            ? <div>
                <RankBlock
                  username = '刀刀狗'
                  canvasId = 'rankBlock1'
                  canvasStyle = { {
                    width: '100%', height: 300, marginBottom: '50px' } }
                  blockBg = '#64caf9'
                  data = { _rankBlockDataHe } />

                <RankBlock
                  username = '桃小姐'
                  canvasId = 'rankBlock2'
                  blockBg = '#FF7CAC'
                  canvasStyle = { {
                    width: '100%', height: 300, marginBottom: '50px' } }
                  data = { _rankBlockDataShe } />

                <RankLine
                  username = '刀刀狗'
                  canvasId = 'rankLine1'
                  usernameStyle = { { margin: 0 } }
                  canvasStyle = { {
                    width: '100%', height: 300, marginBottom: '50px' } }
                  data = { _rankLineDataHe } />

                <RankLine
                  username = '桃小姐'
                  canvasId = 'rankLine2'
                  usernameStyle = { { margin: 0 } }
                  canvasStyle = { {
                    width: '100%', height: 300, marginBottom: '50px' } }
                  data = { _rankLineDataShe } />
              </div>
            : <div style = { {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '90px',
              } }>
                <svg
                  style = { {
                    width: 110,
                    height: 110,
                    fill: 'rgba(216, 213, 214, 0.8)',
                  } }>
                  <use xlinkHref = '#icon-nodata' />
                </svg>

                <div style = { {
                  fontSize: '16px',
                  color: 'rgba(216, 213, 214, 1)'
                } }>暂无数据</div>
              </div>
        }

      </div>
    );
  }
}

const styles = {
  dateSelectStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '80px'
  },

  dateUnit: {
    margin: '0 10px',
  }
};



export default Me;
