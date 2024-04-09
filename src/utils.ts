import { toast } from 'react-toastify';

function capitalizeString(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setDateForm(dateString: string): string {
  const date = new Date(dateString);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${month} ${year}`;
  return formattedDate;
}

const validateForm = (email: string, password: string): boolean => {
  if (!email.trim()) {
    toast.error('E-mail не должен быть пустым.');
    return false;
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasLetter || !hasNumber) {
    toast.error('Пароль должен содержать хотя бы одну букву и цифру.');
    return false;
  }
  return true;
};

function formatNumberWithWord(number:number, word:string) {
  if (number === 1) {
    return `${number} ${word}`;
  } else {
    return `${number} ${word}s`;
  }
}

export { setDateForm, capitalizeString, validateForm,formatNumberWithWord};
