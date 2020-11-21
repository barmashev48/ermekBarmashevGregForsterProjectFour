const app = {};

app.init = function () {};

app.mealFilterUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";
app.mealSearchUrl = "https://www.themealdb.com/api/json/v1/1/search.php";
app.drinkFilterUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
app.drinkSearchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php";

//Get the value of meal/drink inputs and passes to the function that makes api call
app.submitHandler = function (e) {
  e.preventDefault();
  app.scroll($(".resultsSection"));
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
app.displayMeal = function ({ strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube, strIngredient1, strIngredient2, strIngredient3, strIngredient4,strIngredient5 }) {

  const mealRecipeHtml = `
    <div class="displayedRecipe">
      <h2>${strMeal}</h2>
      <h3>${strArea}</h3>
      <p class="category">${strCategory}</p>
      <img src="${strMealThumb}" alt="${strMeal}">
      <p class="instructions">${strInstructions}</p>
      <h4>Ingredients:</h4>
      <ul>
        <li>${strIngredient1}</li>
        <li>${strIngredient2}</li>
        <li>${strIngredient3}</li>
        <li>${strIngredient4}</li>
        <li>${strIngredient5}</li>
      </ul>
    </div>
  `;

  $(".mealRecipe").html(mealRecipeHtml);
};

//Display drink recipe on the page
app.displayDrink = function ({ strDrink, strAlcoholic, strCategory, strInstructions, strDrinkThumb, strIngredient1, strIngredient2, strIngredient3, strIngredient4,strIngredient5 }) {

  const drinkRecipeHtml = `
    <div class="displayedRecipe">
      <h2>${strDrink}</h2>
      <h3>${strAlcoholic}</h3>
      <p class="category">${strCategory}</p>
      <img src="${strDrinkThumb}" alt="${strDrink}">
      <p class="instructions">${strInstructions}</p>
      <h4>Ingredients:</h4>
      <ul>
        <li>${strIngredient1}</li>
        <li>${strIngredient2}</li>
        <li>${strIngredient3}</li>
        <li>${strIngredient4}</li>
        <li>${strIngredient5}</li>
      </ul>
    </div>
  `;

  $(".drinkRecipe").html(drinkRecipeHtml);
};

//Get random number from 0 to arrayLength parameter
app.getRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

app.scroll = function (destination) {
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
  $(".goToMeal").on('click', (e) => { 
    e.preventDefault();
    app.scroll($(".mealCategory")); 
  });

  $(".goToDrinks").on('click', (e) => { 
    e.preventDefault();
    app.scroll($(".drinkCategory")); 
  });
  $("form").on("change", () => { app.categoryChecked() });

  // $('.mealCategoryOption:nth-child(1)').hover(() => console.log('test'));

  // $(`.mealCategoryOption:nth-child(${i})`).hover(
  //   function () { 
  //     $(`.mealCategoryOption:nth-child(${i + 1})`).addClass('hover');
  //     $(`.mealCategoryOption:nth-child(${i - 1})`).addClass('hover');
  //   },
  //   function () { 
  //     $(`.mealCategoryOption:nth-child(${i + 1})`).removeClass('hover');
  //     $(`.mealCategoryOption:nth-child(${i - 1})`).removeClass('hover');
  //   }
  // );

  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 3; j++) {
      if (j === 1) {
        $(`.mealCategoryOption:nth-child(${i})`).hover(
          app.addHoverClass(i, j),
          app.removeHoverClass(i, j)
        );
      } else if (j === 2) {
        $(`.mealCategoryOption:nth-child(${i + 5})`).hover(
          app.addHoverClass(i, j),
          app.removeHoverClass(i, j)
        )
      } else {
        $(`.mealCategoryOption:nth-child(${i + 9})`).hover(
          app.addHoverClass(i, j),
          app.removeHoverClass(i, j)
        );
      }
      // // $(app.mealButtonStructure[i][j]).hover(console.log('test'));
      // console.log(app.mealButtonStructure[i][j]);
      // app.mealButtonStructure[i][j].toggleClass('test');
    }
  }
  // $(".mealCategoryOption").hover((e) => { app.buttonHovered(e) })
};


app.addHoverClass = function (i, j) {
  $(`.mealCategoryOption:nth-child(${i + 1})`).addClass('hover');
  $(`.mealCategoryOption:nth-child(${i - 1})`).addClass('hover');
  // $(`.mealCategoryOption:nth-child(${j + 1})`).addClass('hover');
  // $(`.mealCategoryOption:nth-child(${j - 1})`).addClass('hover');
}
app.removeHoverClass = function (i, j) {
  $(`.mealCategoryOption:nth-child(${i + 1})`).removeClass('hover');
  $(`.mealCategoryOption:nth-child(${i - 1})`).removeClass('hover');
}



// Data structure for buttons 
// app.mealButtonStructure = [
//   [
//     $('mealCategoryOption:nth-child(1)'),
//     $('mealCategoryOption:nth-child(5)'),
//     $('mealCategoryOption:nth-child(9)')
//   ],
//   [
//     $('mealCategoryOption:nth-child(2)'),
//     $('mealCategoryOption:nth-child(6)'),
//     $('mealCategoryOption:nth-child(10)')
//   ],
//   [
//     $('mealCategoryOption:nth-child(3)'),
//     $('mealCategoryOption:nth-child(7)'),
//     $('mealCategoryOption:nth-child(11)')
//   ],
//   [
//     $('mealCategoryOption:nth-child(4)'),
//     $('mealCategoryOption:nth-child(8)'),
//     $('mealCategoryOption:nth-child(12)')
//   ]
// ]
// console.log(app.mealButtonStructure);
// app.drinkButtonStructure = [

// ]




// app.buttonHovered = function (e) {
//   console.log(e);
//   console.log(app.mealButtonStructure[0][0]);
// }

$(function () {
  app.init();
  app.eventListeners();
  app.scroll( $("header"));
});
