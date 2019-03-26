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

    return (
      <div className = 'master'>
        <div className = 'header-and-children'>
          <Header />
          <div className = 'children'>
            { children }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MasterContainer;
