// Get input fields
const cardNumberInput = document.getElementById('card_number');
const expiryDateInput = document.getElementById('expiry_date');
$(expiryDateInput).inputmask('99 / 99', { placeholder: 'MM / YY' });
const cvvInput = document.getElementById('cvv');
const cardholderNameInput = document.getElementById('cardholder_name');
const billingAddressInput = document.getElementById('billing_address');
const amountInput = document.getElementById('amount');

// Add event listeners for input fields
cardNumberInput.addEventListener('input', handleInput);
expiryDateInput.addEventListener('input', handleInput);
cvvInput.addEventListener('input', handleInput);
cardholderNameInput.addEventListener('input', handleInput);
billingAddressInput.addEventListener('input', handleInput);
amountInput.addEventListener('input', handleInput);

// Initialize validation status variable
let isFormValid = true;



function handleInput(event) {
  const input = event.target;
  const errorSpan = input.nextElementSibling;
  const errorText = getErrorText(input);

  if (input.getAttribute('name') === 'card_number') {
    const value = input.value.replace(/\D/g, '').substring(0, 16);
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    input.value = formattedValue;
  }

  if (errorText) {
    errorSpan.textContent = errorText;
    errorSpan.classList.add('error-message');
    input.classList.add('error');
    // Set validation status to false if there's an error
    isFormValid = false;
  } else {
    errorSpan.textContent = '';
    errorSpan.classList.remove('error-message');
    input.classList.remove('error');
  }
}




// Function to get error text for an input field
function getErrorText(input) {
  const value = input.value.trim();
  const name = input.getAttribute('name');
  
  switch (name) {
    case 'card_number':
      const sanitizedValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const isValid = isValidCreditCardNumber(sanitizedValue);
      return isValid ? '' : 'Please enter a valid card number.';
  /**
    case 'expiry_date':
      const [month, year] = value.split('/');
      const currentYear = new Date().getFullYear().toString().substr(-2); // Get last 2 digits of current year
      if (!/^\d{2}\/\d{2}$/.test(value) || parseInt(month) < 1 || parseInt(month) > 12 || parseInt(year) < parseInt(currentYear)) {
        return 'Please enter a valid expiry date.';
      }
      const expiryDate = new Date(parseInt(year), parseInt(month) - 1);
      const today = new Date();
      if (expiryDate < today) {
        return 'Please enter a valid expiry date.';
      }
      return ''; **/
    case 'cvv':
      return value.match(/^\d{3}$/) ? '' : 'Please enter a valid CVV.';
    case 'cardholder_name':
      return value.match(/^[A-Za-z ]+$/) ? '' : 'Please enter a valid cardholder name.';
    case 'billing_address':
      return value ? '' : 'Please enter a valid billing address.';
    case 'amount':
      return value.match(/^\$?\d+(\.\d{2})?$/) ? '' : 'Please enter a valid amount.';
    default:
      return '';
  }
}

function isValidCreditCardNumber(value) {
// Luhn algorithm implementation
let sum = 0;
let double = false;
for (let i = value.length - 1; i >= 0; i--) {
let digit = parseInt(value.charAt(i));
if (double) {
digit *= 2;
if (digit > 9) {
digit -= 9;
}
}
sum += digit;
double = !double;
}
return (sum % 10) === 0;
}

function submitForm() {
  const inputFields = document.querySelectorAll('input');
  let isFormValid = true;
  
  // Check if all input fields are valid
  inputFields.forEach((input) => {
    const errorSpan = input.nextElementSibling;
    const errorText = getErrorText(input);
    
    if (errorText) {
      errorSpan.textContent = errorText;
      errorSpan.classList.add('error-message');
      input.classList.add('error');
      // Set validation status to false if there's an error
      isFormValid = false;
    } else {
      errorSpan.textContent = '';
      errorSpan.classList.remove('error-message');
      input.classList.remove('error');
    }
  });
  
  if (isFormValid) {
    // Submit the form if all input fields are valid
    //alert("all form input are valid")
    showError('Oops, something went wrong!');
  }
}

document.getElementById('submit').addEventListener('click', submitForm);

function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topCenter',
    timeout: 5000
  });
}


