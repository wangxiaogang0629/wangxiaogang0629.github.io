import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';
import assign from 'lodash.assign';

class DateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectItemBoxShow: false,
      arrow: 'arrow-down',
    };
  }

  _showSelectItemBox = () => {
    this.setState({
      isSelectItemBoxShow: !this.state.isSelectItemBoxShow,
      arrow: this.state.arrow == 'arrow-down' ? 'arrow-up' : 'arrow-down'
    });
  }

  _change = (value, text) => {
    this.props.change(value, text);
  }

  _selectBlur = () => {
    this.setState({
      isSelectItemBoxShow: false,
      arrow: 'arrow-down',
    });
  }

  componentDidMount() {

  }

  render() {
    const {
      containerStyle, // 容器最外层样式
      innerTextStyle, // 容器文本样式
      selectValue,
      // data,
      children,
    } = this.props;

    let {
      isSelectItemBoxShow,
      arrow
    } = this.state;

    let _children = children && children.map((item, i) => {

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
          style = { assign({}, {
            color: selectValue ? '#000' : '#bbbbbb'
          }, innerTextStyle) }
          tabIndex = '0'
          onBlur = { e => { this._selectBlur(e); } }
          className = 'select-box'>
          { selectValue ? selectValue : '请选择' }

          {/* 右侧箭头 */}
          <div className = 'arrow-box'>
            <div className = { arrow } />
          </div>

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
