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

  _get = () => {
    // ecZSQ1IYyurBNhnPjtmM3Bus38NSSOfn

    let that = this;

    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
    	if(this.getStatus() == BMAP_STATUS_SUCCESS){
    		var mk = new BMap.Marker(r.point);
    		map.addOverlay(mk);
    		map.panTo(r.point);
    		alert('您的位置：'+r.point.lng+','+r.point.lat);
    	}
    	else {
    		alert('failed'+this.getStatus());
    	}
    });


    function myFun(result){
		    var cityName = result.name;
  		  map.setCenter(cityName);
  		  alert("当前定位城市:"+cityName);

        that._getWeather(cityName);
  	}

  	var myCity = new BMap.LocalCity();
  	myCity.get(myFun);
  }

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


  componentDidMount() {

    this._get();
  }

  render() {
    const {
    } = this.props;

    return (
      <div className = "header">
        <div>LOGO</div>

        <div className = 'weather'>
          <div className = 'site'>位置：{ this.state.site }</div>
          <div className = 'tmp'>
            当前温度：{ this.state.weatherInfo.HeWeather6[0].now.tmp } ℃
          </div>
        </div>
      </div>
    );
  }
}



export default Header;
