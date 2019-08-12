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
      handleInputChange
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
  input: PropTypes.instanceOf(Object).isRequired
};
