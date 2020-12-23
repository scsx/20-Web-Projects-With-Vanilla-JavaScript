const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestCountries = [
    "United States",
    "China",
    "Japan",
    "Germany",
    "United Kingdom",
    "India",
    "France",
    "Italy",
    "Canada",
    "South Korea",
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list into DOM
function createList() {
    // copy original array
    [...richestCountries]
    // create object so that each is associated with a random number
    .map(a => ({ value: a, sort: Math.random() }))
    // sort by that random number (numerically)
    .sort((a, b) => a.sort - b.sort)
    // discard that random number
    .map(a => a.value)
    .forEach((country, index) => {
        const listItem = document.createElement("li");
        listItem.setAttribute("data-index", index);
        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${country}</p>
                <p class="fas fa-grip-lines"></p>
            </div>
        `;

        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });
}

// Check if order is correct (compare with original array)
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const countryName = listItem.querySelector('.draggable').innerText.trim();

        if (countryName !== richestCountries[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

addEventListeners();

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable'); // div to drag
    const dragListItems = document.querySelectorAll('.draggable-list li'); // container to drag to

    draggables.forEach(el => {
        el.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(el => {
        el.addEventListener('dragover', dragOver);
        el.addEventListener('drop', dragDrop);
        el.addEventListener('dragenter', dragEnter);
        el.addEventListener('dragleave', dragLeave);
    });
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
    // Check https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17843004
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    // Swap in DOM
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

check.addEventListener('click', checkOrder);