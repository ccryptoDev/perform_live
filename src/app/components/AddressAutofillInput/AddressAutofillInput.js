import React, { useEffect } from 'react';
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { string, func, number } from 'prop-types';
import { useField } from 'formik';

import config from 'app/config/index.config';
import LabeledInput from '../LabeledInput';
import './styles.scss';

const { GOOGLE_PLACE_COUNTRY } = config;

const AddressAutofillInput = ({
  debounce = 400,
  onChange = () => null,
  onSelect = () => null,
  fieldValue,
  ...props
}) => {
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: GOOGLE_PLACE_COUNTRY,
      },
    },
    debounce,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = e => {
    setValue(e.target.value);
    onChange(e);
  };

  const handleSelect = ({ description, place_id: placeId }) => async () => {
    let getDetailsRes;
    try {
      getDetailsRes = await getDetails({
        placeId,
        fields: ['formatted_address'],
      });
      onSelect(getDetailsRes.formatted_address);
      setValue(getDetailsRes.formatted_address.split(',')[0], false);
    } catch (e) {
      setValue(description.split(',')[0], false);
    } finally {
      clearSuggestions();
    }
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const { place_id, description } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          {description}
        </li>
      );
    });

  return (
    <div className="address-input-container" ref={ref}>
      <LabeledInput
        name="address"
        autoComplete="off"
        onChange={handleInput}
        value={value || fieldValue}
        {...props}
      />
      {status === 'OK' && (
        <ul className="suggestions-container">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

AddressAutofillInput.propTypes = {
  onChange: func,
  debounce: number,
  label: string,
  placeholder: string,
};

export default AddressAutofillInput;

export const ControledAddressAutofillInput = ({
  onChange = () => null,
  debounce,
  value,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <AddressAutofillInput
      name={field.name}
      onChange={e => {
        field.onChange(e);
        onChange(e);
      }}
      debounce={debounce}
      onBlur={field.onBlur}
      fieldValue={field.value || value}
      checked={field.checked}
      error={meta.error}
      {...props}
    />
  );
};
