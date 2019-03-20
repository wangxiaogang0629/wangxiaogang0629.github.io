import React, { Component } from 'react';
import PropTypes from "prop-types";
import HabitMonth from '../../component/habitMonth';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        homeContainer
        <HabitMonth
          selectMonth = { 3 }
          selectYear = { 2019 }
          title = '2019年3月' />
      </div>
    );
  }
}

export default HomeContainer;
