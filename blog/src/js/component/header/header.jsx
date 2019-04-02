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
      },
      site: '北京'
    };
  }

  // 获取当前定位城市
  _getCurrentCity = () => {

  	let currentCity = new BMap.LocalCity();

  	currentCity.get((result) => {
        let cityName = result.name;
        alert("当前定位城市:"+cityName);

        cityName = cityName == '全国' ? '北京' : cityName
        this._getWeather(cityName);
    });

  }

  // 获取当前定位城市天气
  _getWeather = (cityName) => {
    let _url = 'https://free-api.heweather.net/s6/weather/now?location=' +
      cityName + '&key=7fa515daad2842d9bcc001031f109fce';

    this.setState({
      site: cityName,
    })

    $.ajax({
      url: _url,
      type: 'GET',
      success: (res) => {
        this.setState({
          weatherInfo: res
        })
      },
      fail: (err) => {
        console.log(err)
      }
    });
  }

  componentDidMount() {
    // this._getCurrentCity();
  }

  render() {
    const {
    } = this.props;

    return (
      <div className = "header">
        <div className = 'header-inner'>
          <div>LOGO</div>

          <div className = 'weather'>
            <div className = 'site'>位置：{ this.state.site }</div>
            <div className = 'tmp'>
              当前温度：{ this.state.weatherInfo.HeWeather6[0].now.tmp } ℃
            </div>
          </div>
        </div>

      </div>
    );
  }
}



export default Header;
