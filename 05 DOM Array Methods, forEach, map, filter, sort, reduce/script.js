const main                  = document.getElementById('main');
const addUserBtn            = document.getElementById('add-user');
const doubleBtn             = document.getElementById('double');
const showMillionairesBtn   = document.getElementById('show-millionaires');
const sortBtn               = document.getElementById('sort');
const calculateWealthBtn    = document.getElementById('calculate-wealth');

let data = [];

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'; // Clear main div

    providedData.forEach( person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<b>${person.name}</b> <span><small>$ </small>${formatMoney(person.money)}</span>`;
        main.appendChild(element);
    });
}

function formatMoney(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double everyone's money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });
    updateDOM();
}

function sortByRichest() {
    data =data.sort((a, b) => b.money - a.money);
    updateDOM();
}

function showMillionaires() {
    data = data.filter(richperson => richperson.money > 1000000);
    updateDOM();
}

function allWealth() {
    let wealth = 0; // Initial wealth
    wealth = data.reduce((acc, richperson) => (acc += richperson.money), wealth);
    
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth: ${formatMoney(wealth)}</h3>`;
    main.appendChild(wealthEl);
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', allWealth);

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();