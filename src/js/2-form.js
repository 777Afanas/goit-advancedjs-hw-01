const refs = {
  feedbackForm: document.querySelector('.js-feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

const fillFormFields = () => {
  const formDataFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (formDataFromLS === null) {
    return;
  }

  formData = formDataFromLS;
  const formDataKeys = Object.keys(formDataFromLS);

  formDataKeys.forEach(key => {
    refs.feedbackForm.elements[key].value = formDataFromLS[key];
  });
};

fillFormFields();

const onFeedbackFormInput = e => {
  const fieldName = e.target.name;
  const fieldValue = e.target.value.trim();

  formData[fieldName] = fieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = e => {
  e.preventDefault();
  const formDataValues = Object.values(formData);
  if (formDataValues.includes('')) {
    alert('Fill please all fields!');
    return;
  }
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
};

refs.feedbackForm.addEventListener('input', onFeedbackFormInput);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
