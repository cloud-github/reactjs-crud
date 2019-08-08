import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

export default class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { setDefault, options, input } = this.props;
    if (options && setDefault) input.onChange(options[0]);
  }

  handleChange(event) {
    const { input } = this.props;

    // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
    input.onChange && event != null
      ? input.onChange(event)
      : input.onChange(null);
  }

  render() {
    const {
      options,
      placeholder,
      multiple,
      searchable,
      input,
      meta: { dirty, error },
      onChange,
      clearable,
      handleInputChange // Used for async single select
    } = this.props;

    const hasError = dirty && error;
    const customStyles = {
      control: base => ({
        ...base,
        borderColor: hasError ? "red" : null
      })
    };

    return (
      <div>
        <Select
          {...this.props}
          value={input.value || null}
          onChange={onChange || this.handleChange}
          styles={customStyles}
          options={options}
          placeholder={placeholder}
          isMulti={multiple}
          isSearchable={searchable}
          name={input.name}
          isClearable={clearable}
          onInputChange={handleInputChange || onChange}
        />
        {hasError ? error : ""}
      </div>
    );
  }
}

// Specifies the default values for props:
SelectInput.defaultProps = {
  setDefault: false,
  multiple: false,
  searchable: false,
  placeholder: "Select an option",
  isClearable: false
};

SelectInput.propTypes = {
  setDefault: PropTypes.bool,
  multiple: PropTypes.bool,
  isClearable: PropTypes.bool,
  searchable: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  input: PropTypes.instanceOf(Object).isRequired // Said to not work cross-realms
};
