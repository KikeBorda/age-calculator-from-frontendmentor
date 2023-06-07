const handlerError = document.querySelectorAll(".forms__input-error");
const hadlerTextError = document.querySelectorAll(".error__label");
const dateShow = document.querySelectorAll(".dateShow");
const formulario = document.querySelector("#form__validate");
const currentYear = new Date().getFullYear();

function isMonthValid(month) {
  return month >= 1 && month <= 12;
}

function isDayValid(day) {
  return day >= 1 && day <= 31;
}

function isDateValidate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return date.getDate() === parseInt(day);
}

function calculateAge(day, month, year) {
  const birthdate = new Date(year, month - 1, day); // Create a date object from the input
  const today = new Date();

  let ageYears = today.getFullYear() - birthdate.getFullYear();
  let ageMonths = today.getMonth() - birthdate.getMonth();
  let ageDays = today.getDate() - birthdate.getDate();

  if (ageDays < 0) {
    // If the day of the birthdate is greater than the day of today, subtract one month from the age in months
    ageMonths--;
    ageDays += new Date(year, month, 0).getDate(); // Get the number of days in the previous month
  }

  if (ageMonths < 0) {
    // If the month of the birthdate is greater than the month of today, subtract one year from the age in years
    ageYears--;
    ageMonths += 12;
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = {
    year: formulario.year.value,
    month: formulario.month.value,
    day: formulario.day.value,
  };

  let isValidateAll = true;

  [datos].forEach((element) => {
    if (element.year == "") {
      isValidateAll = false;
      formulario.year.style.borderColor = "hsl(0, 100%, 67%)";
      hadlerTextError[2].style.color = "hsl(0, 100%, 67%)";
      handlerError[2].innerText = "this field is required";
    } else {
      hadlerTextError[2].style.color = "hsl(0, 1%, 44%)";
      handlerError[2].innerText = "";
      formulario.year.style.borderColor = "hsl(0, 0%, 86%)";
    }

    if (element.month == "") {
      isValidateAll = false;
      formulario.month.style.borderColor = "hsl(0, 100%, 67%)";
      hadlerTextError[1].style.color = "hsl(0, 100%, 67%)";
      handlerError[1].innerText = "this field is required";
    } else {
      hadlerTextError[1].style.color = "hsl(0, 1%, 44%)";
      handlerError[1].innerText = "";
      formulario.month.style.borderColor = "hsl(0, 0%, 86%)";
    }

    if (element.day == "") {
      isValidateAll = false;
      formulario.day.style.borderColor = "hsl(0, 100%, 67%)";
      hadlerTextError[0].style.color = "hsl(0, 100%, 67%)";
      handlerError[0].innerText = "this field is required";
    } else {
      handlerError[0].innerText = "";
      hadlerTextError[0].style.color = "hsl(0, 1%, 44%)";
      formulario.day.style.borderColor = "hsl(0, 0%, 86%)";
    }
  });

  const { day, month, year } = datos;

  let isValidate = true;

  if (isValidateAll) {
    if (!isDayValid(day)) {
      isValidate = false;
      hadlerTextError[0].style.color = "hsl(0, 100%, 67%)";
      handlerError[0].innerText = "Must be a valid day";
      formulario.day.style.borderColor = "hsl(0, 100%, 67%)";
    } else {
      handlerError[0].innerText = "";
      hadlerTextError[0].style.color = "hsl(0, 1%, 44%)";
      formulario.day.style.borderColor = "hsl(0, 0%, 86%)";
    }

    if (!isMonthValid(month)) {
      isValidate = false;
      formulario.month.style.borderColor = "hsl(0, 100%, 67%)";
      hadlerTextError[1].style.color = "hsl(0, 100%, 67%)";
      handlerError[1].innerText = "Must be a valid month";
    } else {
      handlerError[1].innerText = "";
      hadlerTextError[1].style.color = "hsl(0, 1%, 44%)";
      formulario.month.style.borderColor = "hsl(0, 0%, 86%)";
    }

    if (year > currentYear) {
      isValidate = false;
      formulario.year.style.borderColor = "hsl(0, 100%, 67%)";
      handlerError[2].innerText = "Must be in the past";
      hadlerTextError[2].style.color = "hsl(0, 100%, 67%)";
    } else {
      handlerError[2].innerText = "";
      hadlerTextError[2].style.color = "hsl(0, 1%, 44%)";
      formulario.year.style.borderColor = "hsl(0, 0%, 86%)";
    }

    if (isValidate) {
      const intDate = new Date(year, month - 1, day);
      const today = new Date();
      today.getFullYear();
      today.getMonth();
      today.getDate();

      if (!isDateValidate(day, month, year) || intDate > today) {
        handlerError[0].innerText = "Must be a valid date";
        hadlerTextError[0].style.color = "hsl(0, 100%, 67%)";
        hadlerTextError[1].style.color = "hsl(0, 100%, 67%)";
        hadlerTextError[2].style.color = "hsl(0, 100%, 67%)";
        formulario.day.style.borderColor = "hsl(0, 100%, 67%)";
        formulario.month.style.borderColor = "hsl(0, 100%, 67%)";
        formulario.year.style.borderColor = "hsl(0, 100%, 67%)";
      } else {
        handlerError[0].innerText = "";
        hadlerTextError[0].style.color = "hsl(0, 1%, 44%)";
        hadlerTextError[1].style.color = "hsl(0, 1%, 44%)";
        hadlerTextError[2].style.color = "hsl(0, 1%, 44%)";
        formulario.day.style.borderColor = "hsl(0, 0%, 86%)";
        formulario.month.style.borderColor = "hsl(0, 0%, 86%)";
        formulario.year.style.borderColor = "hsl(0, 0%, 86%)";
      }
    }
  }

  const daysError = handlerError[0].textContent;
  const monthError = handlerError[1].textContent;
  const yearError = handlerError[2].textContent;

  if (
    daysError.length == 0 &&
    monthError.length == 0 &&
    yearError.length == 0
  ) {
    const { years, months, days } = calculateAge(day, month, year);
    dateShow[0].innerHTML = `${years} `;
    dateShow[1].innerHTML = `${months} `;
    dateShow[2].innerHTML = `${days} `;
  } else {
    dateShow[0].innerHTML = "-- ";
    dateShow[1].innerHTML = "-- ";
    dateShow[2].innerHTML = "-- ";
  }
});
