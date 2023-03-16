import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './ErrorBoundary.scss';
import IMG from 'app/utils/images';
import Button from '../Common/Button';

export class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);

    const { history } = props;
    history.listen(() => {
      if (this.state.hasError) {
        this.setState({
          hasError: false,
        });
      }
    });

    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <section id="not-found">
            <div id="title">
              <Button
                className="goback-btn"
                onClick={this.props.history.goBack}
              >
                Go to previous page.
              </Button>
            </div>
            <div className="circles">
              <p>
                {/* <img src={IMG.ERROR_ICON} alt="error-icon" /> */}
                <small>Oops! - Something went wrong.</small> <br />
                Please try again, or contact the support team for assistance if
                required.
              </p>
              <span className="circle big" />
              <span className="circle med" />
              <span className="circle small" />
            </div>
          </section>
        </div>
      );
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object,
};
