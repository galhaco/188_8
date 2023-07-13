/*const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select");
//const coinType = document.querySelector("#signup-form select");
getButton = document.querySelector(".amountForm button");


for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        // selecting USD by default as FROM currency and ILS as TO currency
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "ILS" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){ // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e=>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency); // calling loadFlag with passing select element (toCurrency) of TO
    getExchangeRate(); // calling getExchangeRate
})

function getExchangeRate(){
    const amount = document.querySelector(".amountForm input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/acff22fc5bb77b347e984cca/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
        let totalExRate  = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{ // if user is offline or any other error occured while fetching data then catch function will run
        exchangeRateTxt.innerText = "Something went wrong";
    });
}
numericInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });


  
// Get the select element
const favoriteCoinSelect = document.getElementById('favorite-coin');

// Loop through the country_list object and create an option for each coin
for (const coin in country_list) {
  if (country_list.hasOwnProperty(coin)) {
    const country = country_list[coin];

    // Create an option element
    const option = document.createElement('option');
    option.value = coin;

    // Create a flag image element
    const flagImg = document.createElement('img');
    flagImg.src = 'https://flagcdn.com/16x12/' + country.toLowerCase() + '.png';
    flagImg.alt = country;

    // Create a span element for the coin name and flag
    const coinNameSpan = document.createElement('span');
    coinNameSpan.textContent = coin + ' (' + country + ')';

    // Append the flag and coin name to the option element
    option.appendChild(flagImg);
    option.appendChild(coinNameSpan);

    // Append the option to the select element
    favoriteCoinSelect.appendChild(option);
  }
}
  
function redirectToaboutus() {
window.location.href = "/aboutus";
}



const signupButton = document.getElementById('animationsignup');
const animation = document.getElementById('animation');

signupButton.addEventListener('click', () => {
  animation.classList.add('active');
  // You can add more animation effects or logic here
});*/





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
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}

/*function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
    }
  }
}*/

// Update the loadFlag function
/*function loadFlag(element) {
    const favCookieValue = getCookieValue("fav");
    if (element.value === "USD" && favCookieValue && favCookieValue in country_list) {
      const usFlagImg = document.getElementById("usFlag");
      usFlagImg.src = `https://flagcdn.com/48x36/${favCookieValue.toLowerCase()}.png`;
    } else {
      for (let code in country_list) {
        if (code == element.value) {
          let imgTag = element.parentElement.querySelector("img");
          imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
      }
    }
*/  
// Update the loadFlag function
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
  // You can add more animation effects or logic here
});



  





  
  

  

  


  








  