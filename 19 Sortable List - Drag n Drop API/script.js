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
