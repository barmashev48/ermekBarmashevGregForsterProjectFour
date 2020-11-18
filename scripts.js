const app = {};

app.init = function () {};

app.mealUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";

app.categoryMealChoice = function (e) {
  e.preventDefault();
  const categoryName = e.target.value;

  app.ajaxCall(categoryName);
};

app.ajaxCall = function (category) {
  $.ajax({
    url: this.mealUrl,
    method: "GET",
    dataType: "json",
    data: {
      c: category,
    },
  })
  .then(function(res){
  console.log(res);
})


}

app.eventListeners = function () {
  $("button").on("click", app.categoryMealChoice);
};

$(function () {
  app.init();
  app.eventListeners();
  console.log("ready");
});
