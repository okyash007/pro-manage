export function addElementsToArray(array, elements) {
  const concatenatedArray = [...array, ...elements];
  return concatenatedArray;
}

export function removeElementsFromArray(array, elements) {
  const newArray = array.filter(
    (element) => !elements.includes(element.toString())
  );
  return newArray;
}

export function getTimeFilterStartDate(timeFilter, currentDate) {
  switch (timeFilter) {
    case "today":
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
    case "thisWeek":
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );
    case "thisMonth":
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    default:
      return null; // Return null for an unknown time filter
  }
}

export function getTimeBasedOnFilter(filter) {
  const currentDate = new Date();

  if (filter === "today") {
    const oneDayBefore = new Date(currentDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    return oneDayBefore;
  } else if (filter === "thisWeek") {
    const oneWeekBefore = new Date(currentDate);
    oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);
    return oneWeekBefore;
  } else if (filter === "thisMonth") {
    const oneMonthBefore = new Date(currentDate);
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    return oneMonthBefore;
  } else {
    return null;
  }
}

export function isDatePassed(dateString) {
  const dateToCheck = new Date(dateString);
  const currentDate = new Date();

  const yearToCheck = dateToCheck.getFullYear();
  const monthToCheck = dateToCheck.getMonth();
  const dayToCheck = dateToCheck.getDate();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const isPassed =
    yearToCheck < currentYear ||
    (yearToCheck === currentYear && monthToCheck < currentMonth) ||
    (yearToCheck === currentYear &&
      monthToCheck === currentMonth &&
      dayToCheck < currentDay);

  return isPassed;
}
