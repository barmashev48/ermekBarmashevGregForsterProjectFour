const app = {};

app.init = function () {};

app.mealFilterUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";
app.mealSearchUrl = "https://www.themealdb.com/api/json/v1/1/search.php";
app.drinkFilterUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
app.drinkSearchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php";

app.categoryChoice = function (e) {
  e.preventDefault();
  const categoryMeal = $('input[name=categoryMeal]:checked').val();
  const categoryDrink = $('input[name=categoryDrink]:checked').val();

  app.ajaxCall(categoryDrink, app.drinkFilterUrl);
  app.ajaxCall(categoryMeal, app.mealFilterUrl);
};

app.ajaxCall = function (category, url) {
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: {
      c: category,
    },
  })
  .then(function(res){
    console.log(res);
    if (res.meals) {
      const mealName = res.meals[app.getRandomIndex(res.meals.length)].strMeal;
      console.log(mealName);
      app.searchRecipe(app.mealSearchUrl, mealName, "meals");
    } else {
      const drinkName = res.drinks[app.getRandomIndex(res.drinks.length)].strDrink;
      app.searchRecipe(app.drinkSearchUrl, drinkName, "drinks");
    }
  })
}

app.searchRecipe = function (url, name, type) {
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: {
      s: name
    }
  })
    .then(function (res) {
      console.log(res[type][0]);
      if (type === "meals") {
        app.displayMeal(res[type][0]);
      } else {
        app.displayDrink(res[type][0]);
      }
    })
}

app.displayMeal = function({strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube}){
  recipeHtml = `
    <div class="displayedRecipe">
      <h2>${strMeal}</h2>
      <h3>${strArea}</h3>
      <p class="category">${strCategory}</p>
      <img src="${strMealThumb}" alt="${strMeal}">
      <p class="instructions">${strInstructions}</p>
      <a href="">${strYoutube}</a>
    </div>
  `;

  $('.resultsSection .meal').html(recipeHtml);
}

app.displayDrink = function({strDrink, strAlcoholic, strCategory, strInstructions, strDrinkThumb}) {
  recipeHtml = `
    <div class="displayedRecipe">
      <h2>${strDrink}</h2>
      <h3>${strAlcoholic}</h3>
      <p class="category">${strCategory}</p>
      <img src="${strDrinkThumb}" alt="${strDrink}">
      <p class="instructions">${strInstructions}</p>
    </div>
  `

  $('.resultsSection .drink').html(recipeHtml);
}

app.getRandomIndex = function(arrayLength){
  return Math.floor(Math.random() * arrayLength);
}

app.eventListeners = function () {
  $("form").on("submit", app.categoryChoice);
};


$(function () {
  app.init();
  app.eventListeners();
  console.log("ready");
});
