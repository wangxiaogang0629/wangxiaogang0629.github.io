import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';


class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
    } = this.props;

    return (
      <div className = 'footer'>
         Design By 汪小岗 2020 京ICP备19055582号
      </div>
    );
  }
}

export default Footer;
