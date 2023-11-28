import validate from './validate.js';

// client-side validation
export function validateData(jsonData, schema, callback) {
  let isValid = true;
  const result = validate(jsonData, schema);
  if (result && Array.isArray(result)) {
    isValid = false;
    callback(result);
  }
  return isValid;
}

export async function fetchJson(path) {
  const response = await fetch(path);
  const responseJson = await response.json();
  return responseJson;
}




