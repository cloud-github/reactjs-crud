import React from "react";

const renderField = field => {
  const {
    meta: { touched, error }
  } = field;

  const fieldClassName = `${
    touched && error ? "form-control is-invalid" : "form-control"
  }`;

  const relativePositionStyle = {
    // lets not hardcode here, rather pass as props
    position: "relative"
  };

  const errorSpan = {
    position: "relative",
    color: "red"
  };

  return (
    <div className="form-group">
      <div>
        <div>
          <input
            className={fieldClassName}
            placeholder={field.placeholder}
            type={field.type}
            disabled={field.disabled}
            {...field.input}
            onChange={field.onChange || field.input.onChange}
          />
          {touched && error && <span style={errorSpan}>{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default renderField;
