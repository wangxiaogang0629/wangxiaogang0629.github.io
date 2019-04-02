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

  componentDidMount() {
    this.children.style.minHeight = window.innerHeight - 100 + 'px';

		window.onresize = () => {

			this.children.style.minHeight = window.innerHeight - 100 + 'px';
		}
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div className = 'master'>
        <Header />
        <div className = 'children' ref = { (e) => { this.children = e } }>
          { children }
        </div>
        <Footer />
      </div>
    );
  }
}

export default MasterContainer;
