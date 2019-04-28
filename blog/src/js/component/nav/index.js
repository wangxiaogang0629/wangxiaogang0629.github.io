import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';
import { hashHistory } from 'react-router';

import $ from 'jquery';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  /**
   * 条形统计图
   * @author 汪小岗
   * @date 2019-03-08
  */

  _navClick = (id) => {

    console.log(id)

    this.props.navClick(id);
  }


  render() {
    let {
      navList,
      navClick,
      selectNavId,
      navContainerStyle,
    } = this.props;

    return (
      <div className = "nav-one" style = { navContainerStyle }>
        <ul>
          {
            navList && navList.length > 0
              ? navList.map((v) => {
                  return (
                    <li
                      onClick = { () => { this._navClick(v.id) } }
                      key = { v.id }>
                      <div className = 'text' >{ v.navName }</div>
                      <div className = {
                        selectNavId == v.id ? 'sign sign-select' : 'sign' } />
                    </li>
                  );
                })
              : null
          }
        </ul>
      </div>
    );
  }
}

export default Nav;
