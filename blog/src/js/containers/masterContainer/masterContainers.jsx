import React, { Component } from 'react';
import PropTypes from "prop-types";
import '../../../sass/base/base.scss';
import Header from '../../component/header/header.jsx';
import Footer from '../../component/footer/footer.jsx';

class MasterContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
    } = this.props;

    console.log(this.props,children)

    return (
      <div>
        <Header />
        { children }
        <Footer />
      </div>
    );
  }
}

export default MasterContainer;
