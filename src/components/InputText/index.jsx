import React from 'react';
import './styles.scss';

import { useSelector } from 'react-redux';

const InputText = ({
  label,
  name,
  value,
  handleValue,
  placeholder,
  textarea,
  error,
  type,
  limit,
}) => {
  const { fieldError } = useSelector((state) => state.movies);

  function validateField() {
    if (value === '' && error && fieldError) return true;
    else return false;
  }

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {textarea ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleValue(event.target.value)}
          cols="30"
          rows="4"
          className={`${validateField() ? 'field__error' : ''}`}
        ></textarea>
      ) : (
        <input
          data-testid="input"
          type={type ? type : 'text'}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleValue(event.target.value)}
          className={`${validateField() ? 'field__error' : ''}`}
          max={limit}
        />
      )}
      {console.log('error...')}
      {console.log(value)}
      {console.log(fieldError)}
      {validateField() ? <span>Campo obrigatório</span> : null}
    </div>
  );
};

export default InputText;
