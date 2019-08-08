import _ from "lodash";
import normalize from "json-api-normalizer";

function stripValueObject(values) {
  return _.mapValues(values, function(value) {
    if (Array.isArray(value)) {
      return value.map(option => option.value);
    } else {
      return _.get(value, "value", value);
    }
  });
}

function isPresent(val) {
  if (Array.isArray(val)) return val.length;
  if (typeof val === "boolean" || val === null || val === undefined) return val;
  if (val instanceof Object) return Object.keys(val).length;
  return String(val).trim();
}

function getAssignableLabel(obj, teams, members) {
  if (assignableIsTeam(obj.assignableType)) {
    return teams[obj.assignableId].attributes.name;
  } else if (assignableIsMember(obj.assignableType)) {
    return members[obj.assignableId].attributes.fullName;
  }
}

function assignableIsTeam(type) {
  return type === "Core::Team";
}

function assignableIsMember(type) {
  return type === "Core::Member";
}

function normalizeData(response) {
  let normalizedData = normalize(response.data);
  normalizedData.meta = response.data.meta;
  return normalizedData;
}

function getKeysFromMap(checkedItems) {
  let ids = [];
  checkedItems.forEach(function(_, key) {
    ids.push(key);
  });
  return ids;
}

export {
  stripValueObject,
  isPresent,
  getAssignableLabel,
  normalizeData,
  getKeysFromMap
};
