//selectors
const fav_items = document.querySelectorAll(".fav_item");
const meal_container = document.getElementById("meals");
const favMeal_container = document.querySelector(".fav_container");
const favItemTempl = document.getElementById("favItem_template");
const searchBtn = document.getElementById("search");
const search_input = document.getElementById("search_input");
const close_popup = document.getElementById("close-popup");
const mealInfo_Container = document.querySelector(".meal-info-container");
const mealInfo = document.querySelector("#meal-info");

//event
searchBtn.addEventListener("click", randerMeals);
close_popup.addEventListener("click", () => {
  mealInfo_Container.style.display = "none";
});
//functions
async function randomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data = await resp.json();
  const randomMeal = data.meals[0];

  addMeal(randomMeal, true);
}

randomMeal();
fetchFavMeals();

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const data = await resp.json();
  const meal = data.meals[0];
  return meal;
}

async function searchMeal(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const data = await resp.json();
  const meals = data.meals;
  return meals;
}

function addMeal(mealData, isRandom = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal", "center");
  meal.innerHTML = `
    ${isRandom ? `<span class="tag">Random Recipe</span>` : ""} 
        <div class="meal_header">
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
            </div>
            <div class="meal_body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav_btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

  const addFavBtn = meal.querySelector(".fav_btn");
  addFavBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.classList.contains("active")) {
      removeMealFromLS(mealData.idMeal);
      event.target.classList.remove("active");
      favMeal_container.querySelector("ul").innerHTML = "";
      fetchFavMeals();
    } else {
      event.target.classList.add("active");
      addMealToLS(mealData.idMeal);
      favMeal_container.querySelector("ul").innerHTML = "";
      fetchFavMeals();
    }
  });

  meal
    .querySelector(".meal_header")
    .addEventListener("click", showInfos.bind(null, mealData));
  meal_container.appendChild(meal);
}

function showInfos(mealData) {
  let i = 1;
  mealInfo.querySelector("h3").innerHTML = mealData.strMeal;
  mealInfo.querySelector("img").setAttribute("src", mealData.strMealThumb);
  mealInfo.querySelector("img").setAttribute("alt", mealData.strMeal);
  mealInfo.querySelector("p").innerHTML = mealData.strInstructions;
  for (key in mealData) {
    if (key.search("strIngredient") >= 0 && mealData[key] !== "" && mealData[key] !==null) {
      const newLi = document.createElement("li");
      newLi.innerHTML = mealData[key]+' - '+ mealData['strMeasure'+i];
      i++;
      mealInfo.querySelector("ul").appendChild(newLi);
    }
  }
  mealInfo_Container.style.display = "flex";
}

function addMealToLS(mealId) {
  let mealIds;
  if (localStorage.getItem("mealIds") === null) {
    mealIds = [];
  } else {
    mealIds = JSON.parse(localStorage.getItem("mealIds"));
  }

  mealIds.push(mealId);

  localStorage.setItem("mealIds", JSON.stringify(mealIds));
}

function getMealfromLS() {
  let mealIds;
  if (localStorage.getItem("mealIds") === null) {
    mealIds = [];
  } else {
    mealIds = JSON.parse(localStorage.getItem("mealIds"));
  }

  return mealIds;
}

function removeMealFromLS(mealId) {
  let mealIds;
  if (localStorage.getItem("mealIds") === null) {
    mealIds = [];
  } else {
    mealIds = [...JSON.parse(localStorage.getItem("mealIds"))];
    mealIds = mealIds.filter((id) => parseInt(id, 10) != mealId);
  }

  localStorage.setItem("mealIds", JSON.stringify(mealIds));
}

async function addTofav(mealId) {
  const meal = await getMealById(mealId);
  const favMeal = favItemTempl.content.cloneNode(true);
  const item = favMeal.querySelector(".fav_item");

  favMeal.querySelector("img").setAttribute("src", meal.strMealThumb);
  favMeal.querySelector("img").setAttribute("alt", meal.strMealThumb);
  favMeal.querySelector("span").innerHTML = meal.strMeal;

  item.addEventListener("mouseenter", () => {
    item.querySelector("button").style.display = "block";
  });
  item.addEventListener("mouseleave", () => {
    item.querySelector("button").style.display = "none";
  });

  item.querySelector("button").addEventListener("click", () => {
    removeMealFromLS(mealId);
    favMeal_container.querySelector("ul").innerHTML = "";
    fetchFavMeals();
  });

  item.querySelector('img').addEventListener("click", showInfos.bind(null, meal));
  favMeal_container.querySelector("ul").appendChild(favMeal);
}

function fetchFavMeals() {
  const meals = getMealfromLS();
  meals.forEach((id) => addTofav(id));
}

async function randerMeals() {
  const searchTerm = search_input.value;
  search_input.value = "";
  const meals = await searchMeal(searchTerm);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
}
