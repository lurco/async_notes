import {currencies} from "./currencies.js";

const curInputRef = document.getElementById('currencyInput');
const currencyQuantRef = document.getElementById('currencyQuantity');
const curOutputRef = document.getElementById('currencyOutput');
const optionRef = curInputRef.firstElementChild;
const resultRef = document.getElementById('results');

function generateOption({currencyName, flag, code}) {
    const newOption = optionRef.cloneNode();
    newOption.setAttribute('value', code);

    const spanRef = document.createElement('span');
    const spanContent = document.createTextNode(`${code} - ${currencyName}`);
    spanRef.appendChild(spanContent);

    newOption.appendChild(spanRef);

    return newOption;
}

function generateOptions(selectRef, data) {
    data.forEach((item) => {
        selectRef.appendChild(generateOption(item));
    })
}

generateOptions(curInputRef, currencies);
generateOptions(curOutputRef, currencies);

async function getCurrencyValue(curCode) {
    try {
        const response = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${curCode}/`);
        const data = await response.json();
    return data.rates[0].mid;
    } catch {
        console.log('something is no yes');
    }
}

async function calculateCurrencies() {
    if (curInputRef.value !== '0' && currencyQuantRef.value > 0 && curOutputRef.value !== '0') {
        const curInput = await getCurrencyValue(curInputRef.value);
        const curOutput = await getCurrencyValue(curOutputRef.value);
        if(curInput && curOutput) {
            resultRef.innerText = currencyQuantRef.value * curInput / curOutput;
        } else {
            resultRef.innerText = 'Something is no yes. Try again later';
        }
    }
}


curInputRef.addEventListener('change', calculateCurrencies);
currencyQuantRef.addEventListener('change', calculateCurrencies);
curOutputRef.addEventListener('change', calculateCurrencies);

