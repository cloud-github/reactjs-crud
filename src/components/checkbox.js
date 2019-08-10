import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  className,
  onChange
}) => (
  <div>
    <input type={type} name={name} checked={checked} onChange={onChange} />
    <label htmlFor={className} />
  </div>
);

Checkbox.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
