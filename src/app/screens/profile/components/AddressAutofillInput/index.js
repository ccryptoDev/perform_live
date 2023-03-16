import React, { useState, Component } from 'react';
import { bool, func, number, object } from 'prop-types';
import axios from 'axios';

import mockData from './mockData';
import './styles.scss';

import LabeledInput from '../../../../components/LabeledInput/LabeledInput';

const AddressAutofillInput = ({ debounce = 100, onChange = () => null }) => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState('');
  const [autocomplete, setAutocomplete] = useState(false);
  const [intervalID, setIntervalID] = useState(null);

  const loadData = input => {
    if (process.env.NODE_ENV === 'production') {
      return axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyAvgAgB_J-Z3fGdUfaP9RjvdCgrDBhVrrY`,
        ) // TODO URL to constants
        .then(res => {
          setData(
            res.data.predictions
              .map(el => el.description)
              .filter(city =>
                city.match(
                  `${input.replace(/(^|\s)[a-z]/g, str => str.toUpperCase())}`,
                ),
              ),
          );
          setAutocomplete(city);
        });
    } /* code for dev testing */
    return Promise.resolve(mockData).then(dat => {
      setData(
        dat.predictions
          .map(el => el.description)
          .filter(el =>
            el.match(
              `${input.replace(/(^|\s)[a-z]/g, str => str.toUpperCase())}`,
            ),
          ),
      );
      setAutocomplete(city);
    });
  };
  /* ------------------- */

  const onValueChange = e => {
    const { value } = e.target;

    intervalID && clearTimeout(intervalID);
    setIntervalID(setTimeout(loadData, debounce, value));
    setCity(value);
  };

  const onClick = e => {
    const { innerText: value } = e.target;
    setCity(value);
    setAutocomplete(false);
    setData([]);
    onChange({ target: { name: 'city', value } }); // TODO refactor onChange fn (in reg comp) to take another args (not "e")
  };

  const onFocus = () => {
    setAutocomplete(Boolean(data.length));
  };

  const onBlur = () => {
    setAutocomplete(false);
  };

  return (
    <div className="address-input-container">
      <LabeledInput
        name="address"
        placeholder="Enter your address"
        label="Address"
        autoComplete="off"
        useShadow
        required
        onChange={onValueChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={city || ''}
      />
      {autocomplete && (
        <ul className="suggestions-container">
          {data.map((el, id) => (
            <li key={el + id} onMouseDown={onClick}>
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

AddressAutofillInput.propTypes = {
  onChange: func,
  debounce: number,
};

export default AddressAutofillInput;
