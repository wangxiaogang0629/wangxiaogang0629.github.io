import React, { Component } from 'react';
import PropTypes from "prop-types";
import './index.scss';
import assign from 'lodash.assign';

class HabitMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      month: 30,
    };
  }

  render() {
    const {
      containerStyle, // 容器最外层样式
      title,
      selectMonth,
      selectYear,
      // data,
    } = this.props;

    let data = [
      {
        time: 1,
        score: 0,
      },
      {
        time: 2,
        score: 5,
      },
      {
        time: 3,
        score: 10,
      },
      {
        time: 4,
        score: 5,
      }
    ];

    let month = [];
    let _day = new Date(selectYear, selectMonth - 1, 20);
    let _week = _day.getDay();

    if (selectMonth == '1' || selectMonth == '3' || selectMonth == '5' ||
        selectMonth == '7' || selectMonth == '8' || selectMonth == '10' ||
        selectMonth == '12') {

        month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
          16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
        ];

        for (let i=0; i < _week; i++) {
          month.unshift('')

          data.unshift('')
        }

    } else if (selectMonth == '2') {
      month = selectYear%4 == 0
                ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
                : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

      for (let i=0; i < _week; i++) {
        month.unshift('')

        data.unshift('')
      }
    } else {
      month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
      ];

      for (let i=0; i < _week; i++) {
        month.unshift('')
        data.unshift('')
      }
    }

    return (
      <div style = { assign({}, styles.container, containerStyle) }>
        <div style = { styles.title }>{ title }</div>
        <div style = { styles.dayContainer }>
          <div style = { styles.week }>
            {
              this.state.week.map((v, i) => {
                return (
                  <div
                    key = { i }
                    style = { styles.weekItem }>{ v }</div>
                );
              })
            }
          </div>
          <div style = { styles.dayList }>
            {
              month.map((v, i) => {

                return (
                  <div key = { i }
                    className = {
                      data[i] && data[i].score == 0
                        ? 'day-item warning'
                        : (
                          data[i] && data[i].score == 5
                            ? 'day-item medium'
                            : (
                              data[i] && data[i].score == 10
                                ? 'day-item good'
                                : 'day-item'
                            )
                        )
                    }
                    style = { assign({}, styles.dayItem, {
                      marginRight: (i + 1) % 7 == 0 ? '0' : '28px',
                    }) }>
                    { v }
                  </div>
                );
              })
            }
          </div>

        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: 400,
    border: '1px solid #e0e0e0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    borderRadius: '3px'
  },
  title: {
    height: 37,
    textAlign: 'center',
    color: '#141414',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '37px'
  },
  dayContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  week: {
    height: 42,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #e0e0e0',
    color: '#999',
    fontSize: '14px',
    padding: '0px 24px',
  },
  weekItem: {
    width: 26,
    textAlign: 'center',
  },
  dayList: {
    display: 'flex',
    flexWrap: 'wrap',
    color: '#141414',
    fontSize: '14px',
    padding: '0px 24px',
  },
  dayItem: {
    height: 26,
    width: 26,
    lineHeight: '26px',
    textAlign: 'center',
    // border: '1px solid #ddd',
    borderRadius: '50%',
    marginBottom: '10px'
  }
};

export default HabitMonth;
