const refs = {
  feedbackForm: document.querySelector('.js-feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

// 1 варіант
// const fillFormFields = () => {
//   const formDataFromLS = JSON.parse(
//     localStorage.getItem('feedback-form-state')
//   );

//   if (formDataFromLS === null) {
//     return;
//   }

//   formData = formDataFromLS;
//   const formDataKeys = Object.keys(formDataFromLS);

//   formDataKeys.forEach(key => {
//     refs.feedbackForm.elements[key].value = formDataFromLS[key];
//   });
// };

// 2 варіант
const fillFormFields = () => {
  try {
    const savedData = localStorage.getItem('feedback-form-state');

    if (!savedData) return;
    const formDataFromLS = JSON.parse(savedData);
    formData = { ...formData, ...formDataFromLS };

    const formDataKeys = Object.keys(formData);
    formDataKeys.forEach(key => {
      const element = refs.feedbackForm.elements[key];
      if (element) {
        element.value = formData[key];
      }
    });
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
};

fillFormFields();

const onFeedbackFormInput = e => {
  const fieldName = e.target.name;
  const fieldValue = e.target.value.trim();

  formData[fieldName] = fieldValue;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

// 1 варіант
// const onFeedbackFormSubmit = e => {
//   e.preventDefault();

//   const formDataValues = Object.values(formData);
//   if (formDataValues.includes('')) {
//     alert('Fill please all fields!');
//     return;
//   }

//   console.log(formData);
//   localStorage.removeItem('feedback-form-state');
//   e.currentTarget.reset();

//   formData = { email: '', message: '' };
// };

// 2 варіант
const onFeedbackFormSubmit = e => {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;

  // Валідація згідно з вимогою
  if (email.value.trim() === '' || message.value.trim() === '') {
    alert('All form fields must be filled in!');
    return;
  }

  // Вивід об'єкта в консоль (ВИМОГА)
  console.log(formData);

  // Очищення всього (ВИМОГА)
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();

  // Очищуємо об'єкт у пам'яті
  formData = { email: '', message: '' };
};

refs.feedbackForm.addEventListener('input', onFeedbackFormInput);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
