const app = {};

app.init = function () {};

app.mealFilterUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";
app.mealSearchUrl = "https://www.themealdb.com/api/json/v1/1/search.php?";

app.categoryMealChoice = function (e) {
  e.preventDefault();
  const categoryName = $('input[name=categoryMeal]:checked').val();
  
  app.ajaxCall(categoryName);
};

app.ajaxCall = function (category) {
  $.ajax({
    url: this.mealFilterUrl,
    method: "GET",
    dataType: "json",
    data: {
      c: category,
    },
  })
  .then(function(res){
    const mealName = res.meals[app.getRandomIndex(res.meals.length)].strMeal;

  $.ajax({
    url:app.mealSearchUrl,
    method:"GET",
    dataType:"json",
      data: {
        s:mealName
      }
  })
  .then(function(res){
    app.displayRecipe(res.meals[0]);
    console.log(res.meals[0])
  })
})
}

app.displayRecipe = function({strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube}){
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

app.getRandomIndex = function(arrayLength){
  return Math.floor(Math.random() * arrayLength);
}

app.eventListeners = function () {
  $(".mealForm").on("submit", app.categoryMealChoice);
};

$(function () {
  app.init();
  app.eventListeners();
  console.log("ready");
});
