import React, { Component } from 'react';
import PropTypes from "prop-types";
import Sortable from 'react-sortablejs';
import './index.scss';

class SortTableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4, 5],
    }
  }

  componentDidMount() {

  }

  _onChange = (order) => {
    console.log(order);

    this.setState({ items: order });
  }

  render() {
    const {
    } = this.props;

    let {
      items
    } = this.state;

    let listItems = items.map( val => (<li className = 'items' style = { styles.sortableItems } key = { val } data-id = {val}>{ val }</li>));

    return (
      <div>
        <div>Sortable</div>
        <Sortable
          options = { {
            group: 'shared',
            animation: 150,
            ghostClass: 'blue-background-class'
          } }
          ref = { (c) => {

          } }
          tag = 'ul'
          onChange = { (order, sortable, evt) => {
              this._onChange(order, sortable, evt);
          } }>
          { listItems }
        </Sortable>
      </div>
    );
  }
}

const styles = {
  sortableItems: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 400,
    // border: '1px solid red',
    // background: '#fafafa',
    margin: 5,
    cursor: 'move',
  }
};

export default SortTableList;
