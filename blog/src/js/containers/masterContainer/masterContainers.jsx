import React, { Component } from 'react';
import PropTypes from "prop-types";
import '../../../sass/base/base.scss';
import Header from '../../component/header/header.jsx';
import Footer from '../../component/footer/footer.jsx';
import './index.scss';

class MasterContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
    } = this.props;

    // console.log(this.props,children)

    return (
      <div className = 'master'>
        <div className = 'header-and-children'>
          <Header />
          { children }
        </div>
        <Footer />
      </div>
    );
  }
}

export default MasterContainer;
