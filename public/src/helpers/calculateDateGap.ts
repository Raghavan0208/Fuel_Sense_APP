import moment from 'moment';

export const calculateDateGap = dateString => {
  // Parse the input date string
  const inputDate = moment(dateString);

  // Get the current date
  const currentDate = moment();

  // Calculate the difference in days
  const gapInDays = currentDate.diff(inputDate, 'days');

  return gapInDays;
};
