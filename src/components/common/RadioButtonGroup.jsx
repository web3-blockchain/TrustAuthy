import React from 'react';
import 'assets/css/main.css';

const RadioButtonGroup = ({ options, name, selected, onChange }) => {
  return (
    <>
      {options.map((option, i) => (
        <React.Fragment key={i}>
          <input
            type="radio"
            name={name}
            id={option.id}
            value={option.value}
            onChange={onChange}
            checked={selected === option.value}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </React.Fragment>
      ))}
    </>
  );
};

export default RadioButtonGroup;
