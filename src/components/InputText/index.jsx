import React from 'react';
import './styles.scss';

const InputText = ({
  label,
  name,
  value,
  handleValue,
  placeholder,
  textarea,
  error,
  type,
}) => {
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
        ></textarea>
      ) : (
        <input
          type={type ? type : 'text'}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleValue(event.target.value)}
        />
      )}
      {/* {console.log(error)}
      {console.log(name)} */}
      {error === name ? <span>Campo obrigatório</span> : null}
    </div>
  );
};

export default InputText;
