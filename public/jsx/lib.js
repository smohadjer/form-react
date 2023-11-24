export async function fetchJson(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

export async function getFormData(userData) {
  const formJson = await fetchJson('json/form.json');
  // add value from database to form fields
  if (userData.length > 0) {
    formJson.fields.map(field => {
      const dbField = userData.find((item) => item.name === field.name);
      return field.value = dbField.value;
    });
  }
  return formJson;
}
