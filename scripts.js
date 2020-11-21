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

  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 3; j++) {
      if (j === 1) {
        $(`.mealCategoryOption:nth-child(${i})`).hover(
          function () { app.addHoverClass(i, j) },
          function () { app.removeHoverClass(i, j) }
        );
      } else if (j === 2) {
        $(`.mealCategoryOption:nth-child(${i + 4})`).hover(
          function () { app.addHoverClass(i + 4, j) },
          function () { app.removeHoverClass(i + 4, j) }
        )
      } else if (j === 3){
        $(`.mealCategoryOption:nth-child(${i + 8})`).hover(
          function () { app.addHoverClass(i + 8, j) },
          function () { app.removeHoverClass(i + 8, j) }
        );
      }
    }
  }
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      if (j === 1) {
        $(`.drinkCategoryOption:nth-child(${i})`).hover(
          function () { app.addHoverDrinkClass(i, j) },
          function () { app.removeHoverDrinkClass(i, j) }
        );
      } else if (j === 2) {
        $(`.drinkCategoryOption:nth-child(${i + 3})`).hover(
          function () { app.addHoverDrinkClass(i + 3, j) },
          function () { app.removeHoverDrinkClass(i + 3, j) }
        )
      } else if (j === 3) {
        $(`.drinkCategoryOption:nth-child(${i + 6})`).hover(
          function () { app.addHoverDrinkClass(i + 6, j) },
          function () { app.removeHoverDrinkClass(i + 6, j) }
        );
      }
    }
  }
};


app.addHoverClass = function (i, j) {
  if (j === 1) {
    $(`.mealCategoryOption:nth-child(${i + 4})`).addClass('hover');
  } else if (j === 2) {
    $(`.mealCategoryOption:nth-child(${i - 4})`).addClass('hover');
    $(`.mealCategoryOption:nth-child(${i + 4})`).addClass('hover');
  } else if (j === 3) {
    $(`.mealCategoryOption:nth-child(${i - 4})`).addClass('hover');
  }
  
  if (i === 5 || i === 9) {
    $(`.mealCategoryOption:nth-child(${i + 1})`).addClass('hover');
  } else if (i === 4 || i === 8) {
    $(`.mealCategoryOption:nth-child(${i - 1})`).addClass('hover');
  } else {
    $(`.mealCategoryOption:nth-child(${i + 1})`).addClass('hover');
    $(`.mealCategoryOption:nth-child(${i - 1})`).addClass('hover');
  }
}
app.removeHoverClass = function (i) {
  $(`.mealCategoryOption:nth-child(${i + 1})`).removeClass('hover');
  $(`.mealCategoryOption:nth-child(${i - 1})`).removeClass('hover');
  $(`.mealCategoryOption:nth-child(${i - 4})`).removeClass('hover');
  $(`.mealCategoryOption:nth-child(${i + 4})`).removeClass('hover');
}

app.addHoverDrinkClass = function (i, j) {
  if (j === 1) {
    $(`.drinkCategoryOption:nth-child(${i + 3})`).addClass('hover');
  } else if (j === 2) {
    $(`.drinkCategoryOption:nth-child(${i - 3})`).addClass('hover');
    $(`.drinkCategoryOption:nth-child(${i + 3})`).addClass('hover');
  } else if (j === 3) {
    $(`.drinkCategoryOption:nth-child(${i - 3})`).addClass('hover');
  }

  if (i === 4 || i === 7) {
    $(`.drinkCategoryOption:nth-child(${i + 1})`).addClass('hover');
  } else if (i === 3 || i === 6) {
    $(`.drinkCategoryOption:nth-child(${i - 1})`).addClass('hover');
  } else {
    $(`.drinkCategoryOption:nth-child(${i + 1})`).addClass('hover');
    $(`.drinkCategoryOption:nth-child(${i - 1})`).addClass('hover');
  }
}
app.removeHoverDrinkClass = function (i) {
  $(`.drinkCategoryOption:nth-child(${i + 1})`).removeClass('hover');
  $(`.drinkCategoryOption:nth-child(${i - 1})`).removeClass('hover');
  $(`.drinkCategoryOption:nth-child(${i - 3})`).removeClass('hover');
  $(`.drinkCategoryOption:nth-child(${i + 3})`).removeClass('hover');
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
