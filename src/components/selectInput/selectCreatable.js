import React from "react";
import CreatableSelect from "react-select/creatable";
import PropTypes from "prop-types";

const SelectCreatable = props => {
  const {
    input,
    placeholder,
    options,
    handleInputChange,
    multiple,
    onChange,
    clearable,
    searchable
    // error
    // getOptionValue,
  } = props;

  return (
    <CreatableSelect
      {...props}
      value={input.value.value ? input.value : null} // deal with uncontrolled to controlled input
      name={input.name}
      placeholder={placeholder}
      // getOptionValue={getOptionValue}
      options={options}
      onChange={onChange}
      onInputChange={handleInputChange}
      isMulti={multiple}
      isClearable={clearable}
      isSearchable={searchable}
    />
  );
};

SelectCreatable.defaultProps = {
  placeholder: "Select an option",
  searchable: false,
  clearable: false,
  multiple: false
};

SelectCreatable.propTypes = {
  multiple: PropTypes.bool,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  placeholder: PropTypes.string
  // getOptionValue: PropTypes.func.isRequired,
};

export default SelectCreatable;
