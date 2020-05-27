const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');

// Event Listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('id');
        getMealById(mealID);
    }
});

// Search meal and fetch API
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = '';

    // Get search term
    const term = search.value;

    // check for empty
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`;

            if(data.meals === null) {
                resultHeading.innerHTML = `<h3>No results. Try again.<h3>`;
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" id="${meal.idMeal}">
                            <h2>${meal.strMeal}</h2>
                        </div>
                    </div>
                `).join('')
            }
        });
        search.value = '';
    } else {
        alert('Please enter a search term');
    }
}

// Fetch single meal
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        
        const meal = data.meals[0];
        addMealToDom(meal);
    })
}

// Fetch random meal
function randomMeal() {
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDom(meal);
    })
}

// Add meal detail to DOM
function addMealToDom(meal) {
    const ingredients = [];

    for(let i = 1; i <=20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(` ${meal[`strIngredient${i}`]} -  ${meal[`strMeasure${i}`]}`);
        } else {
            break; // Doesn't get to 20 ingredients
        }
    }

    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `${meal.strCategory}<hr/>` : ''}
                ${meal.strArea ? `${meal.strArea}` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}