import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';

let bannerListInterval;

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0, // banner图当前轮播ID
    }
  }

  componentDidMount() {

    // banner 轮播
    this._banner();
  }

  componentWillUnmount() {
    clearInterval(bannerListInterval);
  }

  _banner = () => {
    bannerListInterval = setInterval(() => {
      console.log(this.state.currentId)

      this.setState({
        currentId: this.state.currentId == this.props.bannerList.length - 1
                    ? 0
                    : ++this.state.currentId
      })
    }, 3000);
  }

  _pointClick = (currentId) => {
    clearInterval(bannerListInterval);
    this.setState({
      currentId: currentId,
    }, () => {
      this._banner();
    })

  }

  render() {
    const {
      bannerList,
      containerStyle,
    } = this.props;

    let {
      currentId,
    } = this.state;

    return (
      <div className = 'banner' style = { containerStyle }>

        { /* banner图 */ }
        <ul className = 'banner-img-box'>
          {
            bannerList && bannerList.length > 0
              ? bannerList.map((v, i) => {
                  return (
                    <li
                      onClick = { () => { console.log(v) } }
                      key = { i }
                      style = { {
                        backgroundImage: `url(${ v.url })`
                      } }
                      className = {
                        currentId == i
                          ? 'banner-img-item banner-img-item-current'
                          : 'banner-img-item'
                      } />
                  );
                })
              : <li className = 'bannerDefault' />
          }
        </ul>

        { /* 点 */ }
        <div className = 'point'>
          <ul className = 'point-inner'>
            {
              bannerList && bannerList.length > 0
                ? bannerList.map((v, i) => {
                    return (
                      <li
                        onClick = { () => { this._pointClick(i); } }
                        key = { i }
                        className = {
                          currentId == i
                            ? 'point-item point-item-current'
                            : 'point-item'
                        } />
                    );
                  })
                : ''
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Banner;
