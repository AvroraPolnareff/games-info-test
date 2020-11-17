import React from "react";
import PropTypes from "prop-types";

export const CheckboxGroup = (props) => {
  const { name, value: checkedValues, onChange, children } = props;
  const onCheckboxChange = (checkboxValue, event) => {
    if (event.target.checked) {
      onChange(checkedValues.concat(checkboxValue));
    } else {
      onChange(checkedValues.filter((v) => v !== checkboxValue));
    }
  };

  const Checkbox = ({ value, ...rest }) => {
    const checked = checkedValues.indexOf(value) > -1;

    return (
      <input
        {...rest}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onCheckboxChange(value, e)}
        value={value}
      />
    );
  };
  return children(Checkbox);
};

CheckboxGroup.propTypes = {
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  children: PropTypes.element,
};
