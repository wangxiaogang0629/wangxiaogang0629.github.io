import React, { Component } from 'react';
import PropTypes from "prop-types";
import './header.scss';

import $ from 'jquery';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: {
        HeWeather6: [
          {
            now: '',
          }
        ],
      }
    };
  }


  componentDidMount() {
    let _url = 'https://free-api.heweather.net/s6/weather/now?location=' +
      '北京' + '&key=7fa515daad2842d9bcc001031f109fce';

    $.ajax({
      url: _url,
      type: 'GET',
      success: (res) => {
        console.log(res)
        this.setState({
          weatherInfo: res
        })
      },
      fail: (err) => {
        console.log(err)
      }
    });
  }

  render() {
    const {
    } = this.props;

    return (
      <div className = "header">
        <div>LOGO</div>

        <div className = 'weather'>
          <div className = 'site'>位置：{ '北京' }</div>
          <div className = 'tmp'>
            当前温度：{ this.state.weatherInfo.HeWeather6[0].now.tmp } ℃
          </div>
        </div>
      </div>
    );
  }
}



export default Header;
