const submitButton = document.getElementById("SubmitButton");
const cityName = document.getElementById("cityName");
const city = document.getElementById("city_name");
const temp_real = document.getElementById("temp_real");
const temp_status = document.getElementById("temp_status");
const dataHide = document.querySelector(".data_hide");
const day = document.getElementById("day");
const date = document.getElementById("today_date");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city.innerText = "Please write a city name";
    dataHide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=ae8e7d82bbca08bd02e04a31152d1749`;
      const res = await fetch(url);
      const data = await res.json();
      const arrData = [data];
      city.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp_real.innerText = arrData[0].main.temp;

      const tempStatus = arrData[0].weather[0].main;
      if (tempStatus == "Sunny") {
        temp_status.innerHTML =
          "<i class='fas fa-solid fa-sun' style='color: #ffdd00'></i>";
      } else if (tempStatus == "Clouds") {
        temp_status.innerHTML =
          "<i class=' fas fa-solid fa-cloud' style'color: #ffffff;'></i>";
      } else if (tempStatus == "Rainy") {
        temp_status.innerHTML =
          "<i class='fas fa-solid fa-cloud-showers-heavy' style='color: #ffffff;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-solid fa-cloud' style='color: #347efe;'></i>";
      }
      dataHide.classList.remove("data_hide");
    } catch {
      city.innerText = "Please enter a valid city name";
    }
  }
};

const getCurrentday = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date();
  return weekday[currentTime.getDay()];
};

const getCurrenttime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var now = new Date();
  var month = months[now.getMonth() + 1];
  var date = now.getDate();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let period = "AM";
  if (hours > 11) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return ` ${month} ${date} | ${hours}:${minutes} ${period}`;
};

day.innerText = getCurrentday();
date.innerText = getCurrenttime();
submitButton.addEventListener("click", getInfo);
