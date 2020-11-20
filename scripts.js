const app = {};

app.init = function () {};

app.mealFilterUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";
app.mealSearchUrl = "https://www.themealdb.com/api/json/v1/1/search.php";
app.drinkFilterUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
app.drinkSearchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php";

//Get the value of meal/drink inputs and passes to the function that makes api call
app.submitHandler = function (e) {
  e.preventDefault();
  const categoryMeal = $("input[name=categoryMeal]:checked").val();
  const categoryDrink = $("input[name=categoryDrink]:checked").val();

  app.filterByCategory(categoryDrink, app.drinkFilterUrl);
  app.filterByCategory(categoryMeal, app.mealFilterUrl);
};

//Make a call that filter meals/drink recipes by the categories
app.filterByCategory = function (category, url) {
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: {
      c: category,
    },
  }).then(function (res) {
    if (res.meals) {
      const mealName = res.meals[app.getRandomIndex(res.meals.length)].strMeal;
      app.searchRecipe(app.mealSearchUrl, mealName, "meals");
    } else {
      const drinkName = res.drinks[app.getRandomIndex(res.drinks.length)].strDrink;
      app.searchRecipe(app.drinkSearchUrl, drinkName, "drinks");
    }
  });
};

//Make an api call that searches for the full meal/drink recipe
app.searchRecipe = function (url, name, type) {
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: {
      s: name,
    },
  }).then(function (res) {
    type === "meals"
      ? app.displayMeal(res[type][0])
      : app.displayDrink(res[type][0]);
  });
};

//Display meal recipe on the page
app.displayMeal = function ({ strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube, }) {

  const mealRecipeHtml = `
    <div class="displayedRecipe">
      <h2>${strMeal}</h2>
      <h3>${strArea}</h3>
      <p class="category">${strCategory}</p>
      <img src="${strMealThumb}" alt="${strMeal}">
      <p class="instructions">${strInstructions}</p>
      <a href="">${strYoutube}</a>
    </div>
  `;

  $(".mealRecipe").html(mealRecipeHtml);
};

//Display drink recipe on the page
app.displayDrink = function ({ strDrink, strAlcoholic, strCategory, strInstructions, strDrinkThumb }) {

  const drinkRecipeHtml = `
    <div class="displayedRecipe">
      <h2>${strDrink}</h2>
      <h3>${strAlcoholic}</h3>
      <p class="category">${strCategory}</p>
      <img src="${strDrinkThumb}" alt="${strDrink}">
      <p class="instructions">${strInstructions}</p>
    </div>
  `;

  $(".drinkRecipe").html(drinkRecipeHtml);
};

//Get random number from 0 to arrayLength parameter
app.getRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

app.scroll = function (e, destination) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: destination.offset().top
  }, 1000);
}

app.categoryChecked = function () {
  console.log('here')
  console.log($("input:checked"))
  $(".checked").removeClass('checked');
  $("input:checked").parent().toggleClass('checked');
}

// All event listeners
app.eventListeners = function () {
  $("form").on("submit", app.submitHandler);
  $(".goToMeal").on('click', (e) => { app.scroll(e, $(".mealCategory")) });
  $(".goToDrinks").on('click', (e) => { app.scroll(e, $(".drinkCategory")) });
  $("form").on("change", () => { app.categoryChecked() });
};

$(function () {
  app.init();
  app.eventListeners();
});
