export function formatString(str) {
  const words = str.split(/(?=[A-Z])/);

  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const formattedString = formattedWords.join(" ");

  return formattedString;
}

export function removeElementFromArray(array, elementToRemove) {
  return array.filter((element) => element !== elementToRemove);
}

export function formatDate(inputDate) {
  let dateObject;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else {
    dateObject = new Date(inputDate);
  }

  const options1 = { day: "numeric", month: "numeric", year: "numeric" };
  const options2 = { month: "short", day: "numeric" };
  const options3 = { day: "numeric", month: "long", year: "numeric" };
  const optionsISO = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formattedDate1 = dateObject.toLocaleDateString("en-IN", options1);
  const formattedDate2 = dateObject.toLocaleDateString("en-US", options2);
  const formattedDate3 = dateObject.toLocaleDateString("en-IN", options3);
  const formattedDateYYYYMMDD = dateObject.toLocaleDateString(
    undefined,
    optionsISO
  );

  return {
    ddmmyyyy: formattedDate1,
    monthDay: formattedDate2,
    dayMonthYear: formattedDate3,
    yyyymmdd: formattedDateYYYYMMDD,
  };
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

export function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);

  textarea.select();

  document.execCommand("copy");

  document.body.removeChild(textarea);
}
