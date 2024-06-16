const setHoursService = (date, hour) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hour);
  return newDate.toISOString();
};

module.exports = setHoursService;
