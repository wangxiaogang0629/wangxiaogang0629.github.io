import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HabitMonth from '../../component/habitMonth';
import DateSelect from '../../component/dateSelect';
import Banner from '../../component/banner';
import './index.scss';
import $ from 'jquery';

import * as actions from '../../actions';

const imageUrl = '/blog/public/images/';

const mapStateToProps = state => {
  return {
    // ceshi: state.me.ceshi
  }
}

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth() + 1,

      imageSrc: '',
      originImg: '',

      src: null,
      crop: {
        aspect: 1,
        width: 80,
        height: 80,
        x: 0,
        y: 0,
      },
      croppedImageUrl: '',
    };
  }

  componentDidMount() {

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
      selectYear,
      selectMonth,
      selectValue,
    } = this.state;
    return (
      <div className = 'container'>

        <div  className = 'content'>
          <div className = 'content-left'>
            <Banner
              containerStyle = { {
                minHeight: '270px',
                height: '270px',
                borderRadius: '5px',
                overflow: 'hidden',
                marginBottom: '30px'
              } }
              bannerList = { [
                {
                  id: 0,
                  url: '../../../../public/images/banner-1.jpg',
                  // `${ imageUrl }banner-1.jpg`,
                },
                {
                  id: 1,
                  url: '../../../../public/images/banner-2.jpg',
                },
                {
                  id: 2,
                  url: '../../../../public/images/banner-3.jpg',
                },
                {
                  id: 3,
                  url: '../../../../public/images/banner-4.jpg',
                }
              ] } />

            <div className = 'content-left-banner-line' />

            <div className = 'content-left-title' >推荐</div>


            <ul className = "video-list">
                <li className = "list">
                  <a href = "">
                    <img src = '../../../../public/images/banner-1.jpg' />
                    <div className = "gf-zhezhao">工程师</div>
                  </a>
                </li>
                <li className = "list">
                  <a href = "">
                    <img src = '../../../../public/images/banner-2.jpg' />
                    <div className = "gf-zhezhao">工程师</div>
                  </a>
                </li>
                <li className = "list">
                  <a href = "">
                    <img src = '../../../../public/images/banner-3.jpg' />
                    <div className = "gf-zhezhao">工程师</div>
                  </a>
                </li>
                <li className = "list">
                  <a href = "">
                    <img src = '../../../../public/images/banner-4.jpg' />
                    <div className = "gf-zhezhao">工程师</div>
                  </a>
                </li>
            </ul>




            <div className = 'content-left-title' >最新上传</div>

            <div className = 'article-block' >国家主席习近平25日在巴黎爱丽舍宫同法国总统马克龙会谈。两国元首一致同意，承前启后，继往开来，在新的历史起点上打造更加坚实、稳固、富有活力的中法全面战略伙伴关系。</div>

          </div>

          <div className = 'content-right'>

            <div className = 'menu'>
              <div className = 'menu-item' >最新发布</div>
              <div className = 'menu-item' >技术分享</div>
              <div className = 'menu-item' >随笔</div>
              <div className = 'menu-item' >诗词杂谈</div>
              <div className = 'menu-item' >音乐分享</div>
            </div>

            <div className = 'localInfo'>
              <div>City: { '北京' } </div>
              <div>Temperature: { '20℃' } </div>
              <div>
                Time: { [
                          new Date().getFullYear(),
                          new Date().getMonth() + 1,
                          new Date().getDate(),
                        ].join('-')
                      }
                      &nbsp;
                      {
                        [
                          new Date().getHours(),
                          new Date().getMinutes(),
                        ].join(':')

                      }
              </div>
            </div>

            <div className = "go-far">
                <h2><p>攻城诗</p></h2>
                <a>
                  <img src = '../../../../public/images/banner-2.jpg' />
                  <div className = "gf-zhezhao">攻城诗</div>
                </a>

                <a>
                  <img src = '../../../../public/images/banner-3.jpg' />
                  <div className = "gf-zhezhao">攻城诗</div>
                </a>
            </div>

            <div className = 'habit-item'>
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
                <div style = { styles.dateUnit }>月</div>
              </div>
              <div className = 'content-right-title' >Reading</div>

              <HabitMonth
                containerStyle = { { width: 300  } }
                selectMonth = { selectMonth }
                selectYear = { selectYear }
                title = {
                  `${ selectYear }年${ selectMonth }月` } />

            </div>

            <div className = 'habit-item'>
              <div className = 'content-right-title' >Photograph</div>

              <HabitMonth
                containerStyle = { { width: 300  } }
                selectMonth = { selectMonth }
                selectYear = { selectYear }
                title = {
                  `${ selectYear }年${ selectMonth }月` } />

            </div>


            <div className = 'habit-item'>
              <div className = 'content-right-title' >Exercise</div>

              <HabitMonth
                containerStyle = { { width: 300  } }
                selectMonth = { selectMonth }
                selectYear = { selectYear }
                title = {
                  `${ selectYear }年${ selectMonth }月` } />

            </div>

          </div>

        </div>

      </div>
    );
  }
}

const styles = {
  dateSelectStyle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
  },
  dateUnit: {
    margin: '0 10px',
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
