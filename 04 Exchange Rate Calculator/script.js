const currencyEl1 = document.getElementById('currency-one');
const currencyEl2 = document.getElementById('currency-two');
const amountEl1 = document.getElementById('amount-one');
const amountEl2 = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update DOM
function calculate() {
    const curr1 = currencyEl1.value;
    const curr2 = currencyEl2.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${curr1}`)
    .then(res => res.json())
    .then(json => {
        const rate = json.rates[curr2];
        rateEl.innerText = `1 ${curr1} = ${rate} ${curr2}`;
        amountEl2.value = (amountEl1.value * rate).toFixed(2)
    });
}

// Event listeners
currencyEl1.addEventListener('change', calculate);
currencyEl2.addEventListener('change', calculate);
amountEl1.addEventListener('input', calculate);
amountEl2.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    const temp = currencyEl1.value;
    currencyEl1.value = currencyEl2.value;
    currencyEl2.value = temp;
    calculate();
});

calculate();