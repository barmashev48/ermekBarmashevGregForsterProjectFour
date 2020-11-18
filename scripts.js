const app = {};

app.init = function () {};

app.mealUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";

app.categoryMealChoice = function (e) {
  e.preventDefault();
  const categoryName = $('input[name=categoryMeal]:checked').val();
  const ingredients = $('.userIngredients').val();
  const area = $('input[name=areaMeal]:checked').val();

  app.ajaxCall(categoryName);
  app.ajaxCall(ingredients);
  app.ajaxCall(area);
};

app.ajaxCall = function (category, ingredients, area) {
  $.ajax({
    url: this.mealUrl,
    method: "GET",
    dataType: "json",
    data: {
      c: category,
      i: ingredients,
      a: area
    },
  })
  .then(function(res){
  console.log(res);
})


}

app.eventListeners = function () {
  $(".mealForm").on("submit", app.categoryMealChoice);
};

$(function () {
  app.init();
  app.eventListeners();
  console.log("ready");
});
