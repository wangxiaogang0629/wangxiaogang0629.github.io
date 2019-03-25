import React, { Component } from 'react';
import PropTypes from "prop-types";
import HabitMonth from '../../component/habitMonth';
import DateSelect from '../../component/dateSelect';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth() + 1,
    };
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
    return (
      <div style = { styles.container }>

        <div style = { styles.dateSelectStyle }>
          <DateSelect
            // innerTextStyle = { {
            //   padding: 0
            // } }
            containerStyle = { {
              width: 120,
              // textAlign: 'center',
            } }
            selectValue = { this.state.selectYear }
            change = { (value, text) => { this._changeDateYear(value, text) } }>
            <div value = {2018}>2018</div>
            <div value = {2019}>2019</div>
            <div value = {2020}>2020</div>
          </DateSelect>
          <div style = { styles.dateUnit }>年</div>
          <DateSelect
            // innerTextStyle = { {
            //   padding: 0
            // } }
            containerStyle = { {
              width: 60,
              // textAlign: 'center',
            } }
            selectValue = { this.state.selectMonth }
            change = { (value, text) => { this._changeDateMonth(value, text) } }>
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

        <HabitMonth
          selectMonth = { this.state.selectMonth }
          selectYear = { this.state.selectYear }
          title = { `${ this.state.selectYear }年${ this.state.selectMonth }月` } />
      </div>
    );
  }
}

const styles = {
  container: {
    padding: 100
  },
  dateSelectStyle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  dateUnit: {
    margin: '0 10px',
  }
}

export default HomeContainer;
