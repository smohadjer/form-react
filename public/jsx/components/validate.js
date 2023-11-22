export function displayServerSideErrors(error, $form) {
  const errors = error.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    errors.forEach((errorObject) => {
      const field = $form.querySelector(`input[name=${ errorObject.name}`);
      if (field) {
        field.classList.add('error');
        field.nextElementSibling.textContent = errorObject.error;
        field.nextElementSibling.removeAttribute('hidden');
      }
    });
  }
}

export function validateClientSide($form) {
  const inputs = $form.querySelectorAll('input');
  const state = { isValid: true };
  const resetValidation = (inputs) => {
    inputs.forEach((input) => {
      input.classList.remove('error');
      input.nextElementSibling.setAttribute('hidden', 'hidden');
    });
  };
  const setError = (input) => {
    state.isValid = false;
    input.classList.add('error');
    input.nextElementSibling.removeAttribute('hidden');
  };
  const formData = new FormData($form);
  const validate = () => {
    for (const item of formData.entries()) {
      const inputField = $form.querySelector(`input[name="${item[0]}"`);
      if (item[0] === 'age' && isNaN(item[1])) {
        setError(inputField);
      }

      // to find out if a string contains number we use regix /\d/
      if (item[0] !== 'age' && /\d/.test(item[1])) {
        setError(inputField);
      }
    }
  };

  resetValidation(inputs);
  validate();

  return state.isValid;
}
