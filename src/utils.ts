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


export { setDateForm, capitalizeString };
