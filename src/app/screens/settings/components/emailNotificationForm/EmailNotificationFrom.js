import React from 'react';
import propTypes from 'prop-types';
import ToggleButton from '../../../../components/ToggleButton';
import './EmailNotificationForm.scss';

const ToggleElement = ({ label, description }) => {
  return (
    <div className="input-name toggle-group">
      <div className="toggle-data">
        <div className="toggle-label">{label}</div>
        <div className="toggle-description">{description}</div>
      </div>
      <ToggleButton />
    </div>
  );
};

ToggleElement.propTypes = {
  label: propTypes.string,
  description: propTypes.string,
};

const EmailNotificationForm = () => {
  return (
    <div className="email-notify-form">
      <ToggleElement
        label="New orders"
        description="We will nofify you if someone starts follow you"
      />
      <ToggleElement
        label="New followers"
        description="We will nofify you if someone starts follow you"
      />
      <ToggleElement
        label="Favorited perfomance is upcoming"
        description="Favorited perfomance is upcoming"
      />
      <ToggleElement
        label="Favorited perfomance is upcoming"
        description="Favorited perfomance is upcoming"
      />
      <ToggleElement
        label="Performer you are following assigned a new performance"
        description="Favorited perfomance is upcoming"
      />
      <ToggleElement
        label="Shipment updates"
        description="Favorited perfomance is upcoming"
      />
      <ToggleElement
        label="Marketing announcements"
        description="Favorited perfomance is upcoming"
      />
    </div>
  );
};

export default EmailNotificationForm;
