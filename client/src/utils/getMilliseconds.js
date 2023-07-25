const millisecondsToDateString = (milliseconds) => {
  const date = new Date();
  date.setTime(milliseconds);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  return dateString;
}

export default millisecondsToDateString;