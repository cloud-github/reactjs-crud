import _ from "lodash";

function stripValueObject(values) {
  return _.mapValues(values, function(value) {
    if (Array.isArray(value)) {
      return value.map(option => option.value);
    } else {
      return _.get(value, "value", value);
    }
  });
}

export { stripValueObject };
