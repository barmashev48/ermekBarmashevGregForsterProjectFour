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
    // console.log(res[type][0][`strIngredient${1}`]); 
    // console.log(res);
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (res[type][0][`strIngredient${i}`] !== null && res[type][0][`strIngredient${i}`] !== "" && res[type][0][`strIngredient${i}`]) {
        ingredients.push(res[type][0][`strIngredient${i}`]);
      }
    }
    console.log('this is the array');
    console.log(ingredients);
    type === "meals"
      ? app.displayMeal(res[type][0], ingredients)
      : app.displayDrink(res[type][0], ingredients);
  });
};

//Display meal recipe on the page
app.displayMeal = function ({
  strMeal,
  strCategory,
  strArea,
  strInstructions,
  strMealThumb,
  strYoutube,
}, ingredients) {
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
  ingredients.forEach(item => {
    let displayIngredient = `<li>${item}</li>`
    $(".mealRecipe ul").append(displayIngredient);
  })
  $('.showInstructions').on('click', () => {
    if ($('.instructionArrow i').attr('class') === 'fas fa-chevron-right') {
      $('.instructions').slideDown();
      $('.instructionArrow i').attr('class', 'fas fa-chevron-down');
    } else if ($('.instructionArrow i').attr('class') === 'fas fa-chevron-down') {
      $('.instructions').slideUp();
      $('.instructionArrow i').attr('class', 'fas fa-chevron-right');
    }
  })
};

//Display drink recipe on the page
app.displayDrink = function ({
  strDrink,
  strAlcoholic,
  strCategory,
  strInstructions,
  strDrinkThumb
}, ingredients) {
  const drinkRecipeHtml = `
    <div class="displayedRecipe">
      <h2>${strDrink}</h2>
      <h3>${strAlcoholic}</h3>
      <h4>${strCategory}</h4>
      <img src="${strDrinkThumb}" alt="${strDrink}">
      <p class="instructions">${strInstructions}</p>
      <h4>Ingredients:</h4>
      <ul>
      </ul>
    </div>
  `;
  $(".drinkRecipe").html(drinkRecipeHtml);
  ingredients.forEach(item => {
    let displayIngredient = `<li>${item}</li>`
    $(".drinkRecipe ul").append(displayIngredient);
  })
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
  // console.log("here");
  // console.log($("input:checked"));
  $(".checked").removeClass("checked");
  $("input:checked").parent().toggleClass("checked");
};

app.startAgain = function(e){
  e.preventDefault();
  $('form').trigger("reset");
  app.scroll($("header"));
}

// All event listeners
app.eventListeners = function () {
  $("form").on("submit", app.submitHandler);
  $(".goToMeal").on("click", (e) => {
    e.preventDefault();
    app.scroll($(".mealCategory"));
  });

  $(".goToDrinks").on("click", (e) => {
    e.preventDefault();
    app.scroll($(".drinkCategory"));
  });

  $("form").on("change", () => {
    app.categoryChecked();
  });

  $(".startAgainButton").on('click', (e) => { app.startAgain(e) });

  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 3; j++) {
      switch (j) {
        case 1:
          $(`.mealCategoryOption:nth-child(${i})`).hover(
            function () {
              app.addHoverClass(i, j);
            },
            function () {
              app.removeHoverClass(i, j);
            }
          );

        case 2:
          $(`.mealCategoryOption:nth-child(${i + 4})`).hover(
            function () {
              app.addHoverClass(i + 4, j);
            },
            function () {
              app.removeHoverClass(i + 4, j);
            }
          );
        case 3:
          $(`.mealCategoryOption:nth-child(${i + 8})`).hover(
            function () {
              app.addHoverClass(i + 8, j);
            },
            function () {
              app.removeHoverClass(i + 8, j);
            }
          );
      }
    }
  }
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      switch (j) {
        case 1:
          $(`.drinkCategoryOption:nth-child(${i})`).hover(
            function () {
              app.addHoverDrinkClass(i, j);
            },
            function () {
              app.removeHoverDrinkClass(i, j);
            }
          );
          break;

        case 2:
          $(`.drinkCategoryOption:nth-child(${i + 3})`).hover(
            function () {
              app.addHoverDrinkClass(i + 3, j);
            },
            function () {
              app.removeHoverDrinkClass(i + 3, j);
            }
          );
          break;

        case 3:
          $(`.drinkCategoryOption:nth-child(${i + 6})`).hover(
            function () {
              app.addHoverDrinkClass(i + 6, j);
            },
            function () {
              app.removeHoverDrinkClass(i + 6, j);
            }
          );
      }
    }
  }
};

app.addHoverClass = function (i, j) {
  if (j === 1) {
    $(`.mealCategoryOption:nth-child(${i + 4})`).addClass("hover");
  } else if (j === 2) {
    $(`.mealCategoryOption:nth-child(${i - 4})`).addClass("hover");
    $(`.mealCategoryOption:nth-child(${i + 4})`).addClass("hover");
  } else if (j === 3) {
    $(`.mealCategoryOption:nth-child(${i - 4})`).addClass("hover");
  }

  if (i === 5 || i === 9) {
    $(`.mealCategoryOption:nth-child(${i + 1})`).addClass("hover");
  } else if (i === 4 || i === 8) {
    $(`.mealCategoryOption:nth-child(${i - 1})`).addClass("hover");
  } else {
    $(`.mealCategoryOption:nth-child(${i + 1})`).addClass("hover");
    $(`.mealCategoryOption:nth-child(${i - 1})`).addClass("hover");
  }
};
app.removeHoverClass = function (i) {
  $(`.mealCategoryOption:nth-child(${i + 1})`).removeClass("hover");
  $(`.mealCategoryOption:nth-child(${i - 1})`).removeClass("hover");
  $(`.mealCategoryOption:nth-child(${i - 4})`).removeClass("hover");
  $(`.mealCategoryOption:nth-child(${i + 4})`).removeClass("hover");
};

app.addHoverDrinkClass = function (i, j) {
  if (j === 1) {
    $(`.drinkCategoryOption:nth-child(${i + 3})`).addClass("hover");
  } else if (j === 2) {
    $(`.drinkCategoryOption:nth-child(${i - 3})`).addClass("hover");
    $(`.drinkCategoryOption:nth-child(${i + 3})`).addClass("hover");
  } else if (j === 3) {
    $(`.drinkCategoryOption:nth-child(${i - 3})`).addClass("hover");
  }

  if (i === 4 || i === 7) {
    $(`.drinkCategoryOption:nth-child(${i + 1})`).addClass("hover");
  } else if (i === 3 || i === 6) {
    $(`.drinkCategoryOption:nth-child(${i - 1})`).addClass("hover");
  } else {
    $(`.drinkCategoryOption:nth-child(${i + 1})`).addClass("hover");
    $(`.drinkCategoryOption:nth-child(${i - 1})`).addClass("hover");
  }
};
app.removeHoverDrinkClass = function (i) {
  $(`.drinkCategoryOption:nth-child(${i + 1})`).removeClass("hover");
  $(`.drinkCategoryOption:nth-child(${i - 1})`).removeClass("hover");
  $(`.drinkCategoryOption:nth-child(${i - 3})`).removeClass("hover");
  $(`.drinkCategoryOption:nth-child(${i + 3})`).removeClass("hover");
};

$(function () {
  app.init();
  app.eventListeners();
  // app.scroll($("header"));
});
