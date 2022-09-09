let newday = document.querySelector("#day");
let now = new Date();
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

newday.innerHTML = days[now.getDay()];

function getcity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let enter = (document.querySelector("h1").innerHTML = city);
  search(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", getcity);

let newhour = now.getHours();
if (newhour < 10) {
  newhour = `0${newhour}`;
}
let newminute = now.getMinutes();
if (newminute < 10) {
  newminute = `0${newminute}`;
}
let time = document.querySelector("#fulltime");
time.innerHTML = `${newhour}:${newminute}`;

function search(city) {
  let apikey = "b40b135798f82a05aed08769f9275f50";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(api).then(temperature);
}

function temperature(response) {
  console.log(response.data);
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;
  let newtemp = document.querySelector("#temperature");
  newtemp.innerHTML = Math.round(response.data.main.temp);
  let newhum = document.querySelector("#humidity");
  newhum.innerHTML = Math.round(response.data.main.humidity);
  let newsunny = document.querySelector(".sunny");
  newsunny.innerHTML = response.data.weather[0].description;
  let windy = document.querySelector("#wind");
  windy.innerHTML = Math.round(response.data.wind.speed);
}

function current(position) {
  console.log(position);
  let apikey = "b40b135798f82a05aed08769f9275f50";
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}&units=metric`;
  axios.get(api).then(temperature);
}
function toclick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(current);
}

let button = document.querySelector("button");
button.addEventListener("click", toclick);
search("paris");
