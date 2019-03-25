import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';
import assign from 'lodash.assign';

class DateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectItemBoxShow: false
    };
  }

  _showSelectItemBox = () => {
    this.setState({ isSelectItemBoxShow: !this.state.isSelectItemBoxShow });
  }

  _change = (value, text) => {
    this.props.change(value, text);
  }

  _selectBlur = () => {
    console.log('_selectBlur')
    this.setState({ isSelectItemBoxShow: false });
  }

  componentDidMount() {

  }

  render() {
    const {
      containerStyle, // 容器最外层样式
      selectValue,
      // data,
      children,
    } = this.props;

    let {
      isSelectItemBoxShow,
    } = this.state;

    let _children = children && children.map((item, i) => {

      console.log(item, item.props.value)

      let value = item.props.value;
			let text = item.props.children;

      return (
        <div
          className = {
            selectValue == value
              ? 'select-item select-item-select'
              : 'select-item'
          }
          onMouseDown = { () => { this._change(value, text); } }
          key = { i }>{ text }</div>
      );
    });

    return (
      <div style = { assign({}, styles.container, containerStyle) }>
        { /* 选择框 */ }
        <div
          onClick = { () => { this._showSelectItemBox() } }
          style = { {
            color: selectValue ? '#000' : '#bbbbbb'
          } }
          tabIndex = '0'
          onBlur = { e => { this._selectBlur(e); } }
          className = 'select-box'>
          { selectValue ? selectValue : '请选择' }
        </div>

        { /* 下拉内容 */ }
        <div
          style = { {
            height: isSelectItemBoxShow ? (_children.length * 30) : 0
          } }
          className = {
            isSelectItemBoxShow
              ? 'select-item-box select-item-box-show'
              : 'select-item-box'
          }>
          <div>
            {
              _children
            }
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: 398,
    height: 30,
    position: 'relative',
  },

};

export default DateSelect;
