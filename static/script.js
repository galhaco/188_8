const dropList = document.querySelectorAll("form select"),
  fromCurrency = document.getElementById("fromCurrencySelect"),
  toCurrency = document.getElementById("toCurrencySelect"),
  getButton = document.querySelector(".amountForm button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected = i === 0 ? (currency_code === "USD" || currency_code === getCookieValue("fav")) ? "selected" : "" : currency_code === "ILS" ? "selected" : "";
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  dropList[i].addEventListener("change", e => {
    loadFlag(e.target);
  });
}

window.addEventListener("load", () => {
  getExchangeRate();
});

var x;
var y;
function signUp() {
  y = document.getElementById("password").value;
  x = document.getElementById("favoriteCoin").value;
  document.cookie = "password="+y;
  document.cookie = "favcoin="+x;
}

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}

const nameCookieValue = getCookie("name");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("greetMes").innerText = "Hello "+getCookie("userName");
  document.getElementById("greetMes2").innerText = "Your password is: " +getCookie("password");;
  document.getElementById("greetMes3").innerText = "Your faverorite Coin is: " +getCookie("favcoin");;

});

getButton.addEventListener("click", e => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".amountForm input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal === "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/acff22fc5bb77b347e984cca/latest/${fromCurrency.value}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
      var tex = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
      
      console.log(tex);
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}

function loadFlag(element) {
    const favCookieValue = getCookieValue("fav");
    for (let code in country_list) {
      if (code == element.value) {
        let imgTag = element.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
      }
    }
}
  

function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

const favCookieValue = getCookieValue("fav");
if (favCookieValue) {
  fromCurrency.value = favCookieValue;
}

numericInput.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

const favoriteCoinSelect = document.getElementById("favorite-coin");
favoriteCoinSelect.addEventListener("change", () => {
  const selectedCoin = favoriteCoinSelect.value;
  document.cookie = `fav=${selectedCoin}; path=/`;
});

function redirectToaboutus() {
  window.location.href = "/aboutus";
}

const signupButton = document.getElementById("animationsignup");
const animation = document.getElementById("animation");

signupButton.addEventListener("click", () => {
  animation.classList.add("active");
});

