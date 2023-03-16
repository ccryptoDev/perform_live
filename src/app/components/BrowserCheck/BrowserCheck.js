import React, { Component } from 'react';
import Bowser from 'bowser';
import config from 'app/config/index.config';
import Modal from '../Modal';

class BrowserCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.minVersions = config.MIN_BROWSER_VERSIONS;
    const browser = Bowser.getParser(window.navigator.userAgent);

    if (!browser.satisfies(this.minVersions)) {
      this.state.isModalOpen = true;
    }
  }

  render() {
    return (
      <Modal
        isModalOpen={this.state.isModalOpen}
        closeModal={() => this.setState({ isModalOpen: false })}
      >
        <h2>Browser unsupported</h2>
      </Modal>
    );
  }
}

export default BrowserCheck;
