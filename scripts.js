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
      const drinkName =
        res.drinks[app.getRandomIndex(res.drinks.length)].strDrink;
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
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (
        res[type][0][`strIngredient${i}`] !== null &&
        res[type][0][`strIngredient${i}`] !== "" &&
        res[type][0][`strIngredient${i}`]
      ) {
        ingredients.push(res[type][0][`strIngredient${i}`]);
      }
    }
    type === "meals"
      ? app.displayMeal(res[type][0], ingredients)
      : app.displayDrink(res[type][0], ingredients);
  });
};

//Display meal recipe on the page
app.displayMeal = function (
  { strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube },
  ingredients
) {
  const mealRecipeHtml = `
    <div class="displayedRecipe">
      <h2>${strMeal}</h2>
      <h3>${strArea}</h3>
      <h4>${strCategory}</h4>
      <img src="${strMealThumb}" alt="${strMeal}">
      <button class="showInstructions">Show instructions
        <span class="instructionArrow"> 
          <i class="fas fa-chevron-right"></i>
        </span>
      </button>
      <p class="instructions">${strInstructions}</p>
      <h4>Ingredients:</h4>
      <ul>
        
      </ul>
    </div>
  `;
  $(".mealRecipe").html(mealRecipeHtml);
  ingredients.forEach((item) => {
    let displayIngredient = `<li>${item}</li>`;
    $(".mealRecipe ul").append(displayIngredient);
  });
  $(".showInstructions").on("click", () => {
    if ($(".instructionArrow i").attr("class") === "fas fa-chevron-right") {
      $(".instructions").slideDown();
      $(".instructionArrow i").attr("class", "fas fa-chevron-down");
    } else if (
      $(".instructionArrow i").attr("class") === "fas fa-chevron-down"
    ) {
      $(".instructions").slideUp();
      $(".instructionArrow i").attr("class", "fas fa-chevron-right");
    }
  });
};

//Display drink recipe on the page
app.displayDrink = function (
  { strDrink, strAlcoholic, strCategory, strInstructions, strDrinkThumb },
  ingredients
) {
  const drinkRecipeHtml = `
    <div class="displayedRecipe">
      <h2>${strDrink}</h2>
      <h3>${strAlcoholic}</h3>
      <h4>${strCategory}</h4>
      <img src="${strDrinkThumb}" alt="${strDrink}">
      <p class="drinkInstructions">${strInstructions}</p>
      <h4>Ingredients:</h4>
      <ul>
      </ul>
    </div>
  `;
  $(".drinkRecipe").html(drinkRecipeHtml);
  ingredients.forEach((item) => {
    let displayIngredient = `<li>${item}</li>`;
    $(".drinkRecipe ul").append(displayIngredient);
  });
};

//Get random number from 0 to arrayLength parameter
app.getRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

app.scroll = function (destination) {
  $("html, body").animate(
    {
      scrollTop: destination.offset().top,
    },
    700
  );
};

app.categoryChecked = function () {
  $(".checked").removeClass("checked");
  $("input:checked").parent().toggleClass("checked");
};

app.startAgain = function (e) {
  e.preventDefault();
  // $("#myForm").trigger("reset");
  app.scroll($("header"));
};
//Slides the image on meal choice page
app.showMealImage = function () {
  $(".mealImg").animate({ left: "20%" }, 1000);
};

app.showDrinkImage = function () {
  $(".drinkImg").animate({ left: "20%" }, 1000);
};

// All event listeners
app.eventListeners = function () {
  $("form").on("submit", app.submitHandler);
  $(".goToMeal").on("click", (e) => {
    e.preventDefault();
    app.scroll($(".mealCategory"));
    app.showMealImage();
  });

  $(".goToDrinks").on("click", (e) => {
    e.preventDefault();
    app.scroll($(".drinkCategory"));
    app.showDrinkImage();
  });

  $("form").on("change", () => {
    app.categoryChecked();
  });

  $(".startAgainButton").on("click", (e) => {
    $("form").trigger("reset");
    // $("radio:checked").removeAttr('checked');
    app.startAgain(e);
  });

  // below code is for adding hover states to input buttons
  // first for loop is for the two different inputs: meals and drinks
  for (let k = 0; k <= 1; k++) {
    let category = 'meal';
    let colHeight = 4;
    if (k === 1) {
      category = 'drink';
      colHeight = 3
    }
    for (let i = 1; i <= 3; i++) { // each iteration of i is a column
      for (let j = 1; j <= colHeight; j++) { // each iteration of j is a row in each column
        switch (j) {
          case 1: // this would be all of first row (j = 1)
            $(`.${category}CategoryOption:nth-child(${i})`).hover( 
              function () {
                app.addHoverClass(i, j, category);
              },
              function () {
                app.removeHoverClass(i, category);
              }
            );
            break;
          case 2: // this would be all of second row (j = 2)
            $(`.${category}CategoryOption:nth-child(${i + 3})`).hover(
              function () {
                app.addHoverClass(i + 3, j, category);
              },
              function () {
                app.removeHoverClass(i + 3, category);
              }
            );
            break;
          case 3: // this would be all of third row (j = 3)
            $(`.${category}CategoryOption:nth-child(${i + 6})`).hover(
              function () {
                app.addHoverClass(i + 6, j, category);
              },
              function () {
                app.removeHoverClass(i + 6, category);
              }
            );
          case 4: // this would be all of fourth row (j = 3)
            $(`.${category}CategoryOption:nth-child(${i + 9})`).hover(
              function () {
                app.addHoverClass(i + 9, j, category);
              },
              function () {
                app.removeHoverClass(i + 9, category);
              }
            );
        }
      }
    }
  }
};

app.addHoverClass = function (i, j, category) {
  // this chain of if statements is for above and below options
  if (j === 1) {
    $(`.${category}CategoryOption:nth-child(${i + 3})`).addClass("hover");
  } else if (j === 2 || j === 3) {
    $(`.${category}CategoryOption:nth-child(${i - 3})`).addClass("hover");
    $(`.${category}CategoryOption:nth-child(${i + 3})`).addClass("hover");
  } else if (j === 4) {
    $(`.${category}CategoryOption:nth-child(${i - 3})`).addClass("hover");
  }
  // this chain of if statements are for the options to the side of the current button
  if (i === 4 || i === 7 || i === 10) { // all buttons along left wall
    $(`.${category}CategoryOption:nth-child(${i + 1})`).addClass("hover");
  } else if (i === 3 || i === 6 || i === 9) { // all buttons along right wall
    $(`.${category}CategoryOption:nth-child(${i - 1})`).addClass("hover");
  } else {
    $(`.${category}CategoryOption:nth-child(${i + 1})`).addClass("hover");
    $(`.${category}CategoryOption:nth-child(${i - 1})`).addClass("hover");
  }
};
app.removeHoverClass = function (i, category) {
  // remove any hover classes below, above, or to the side
  $(`.${category}CategoryOption:nth-child(${i + 1})`).removeClass("hover");
  $(`.${category}CategoryOption:nth-child(${i - 1})`).removeClass("hover");
  $(`.${category}CategoryOption:nth-child(${i - 3})`).removeClass("hover");
  $(`.${category}CategoryOption:nth-child(${i + 3})`).removeClass("hover");
};

$(function () {
  app.init();
  app.eventListeners();
  app.scroll($("header"));
});
