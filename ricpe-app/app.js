//selectors
const fav_items = document.querySelectorAll(".fav_item");
const meal_container = document.getElementById("meals");
const favMeal_container = document.querySelector('.fav_container');
const favItemTempl = document.getElementById("favItem_template");
const searchBtn = document.getElementById('search');
const search_input = document.getElementById('search_input');

//event
searchBtn.addEventListener("click" , randerMeals);
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

    if(event.target.classList.contains('active')){
      removeMealFromLS(mealData.idMeal);
      event.target.classList.remove('active');
      favMeal_container.querySelector('ul').innerHTML = '';
      fetchFavMeals();
    }else{
      event.target.classList.add('active')
      addMealToLS(mealData.idMeal);
      favMeal_container.querySelector('ul').innerHTML = '';
      fetchFavMeals();
    }  
  });

  meal_container.appendChild(meal);
}

function addMealToLS(mealId){
  let mealIds;
  if(localStorage.getItem('mealIds') === null){
    mealIds = [];
  }else{
    mealIds = JSON.parse(localStorage.getItem('mealIds'));
  }

  mealIds.push(mealId);
  
  localStorage.setItem('mealIds', JSON.stringify(mealIds));
}

function getMealfromLS(){
  let mealIds;
  if(localStorage.getItem('mealIds') === null){
    mealIds = [];
  }else{
    mealIds = JSON.parse(localStorage.getItem('mealIds'));
  }

  return mealIds;
}

function removeMealFromLS(mealId){
  let mealIds;
  if(localStorage.getItem('mealIds') === null){
    mealIds = [];
  }else{
    mealIds = [...JSON.parse(localStorage.getItem('mealIds'))];
    mealIds = mealIds.filter((id) => parseInt(id , 10) != mealId);
  }
  
  localStorage.setItem('mealIds', JSON.stringify(mealIds));
}

async function addTofav(mealId) {
  const meal = await getMealById(mealId);
  const favMeal = favItemTempl.content.cloneNode(true);
  const item = favMeal.querySelector('.fav_item');

  favMeal.querySelector('img').setAttribute('src', meal.strMealThumb);
  favMeal.querySelector('img').setAttribute('alt', meal.strMealThumb);
  favMeal.querySelector('span').innerHTML = meal.strMeal;

  item.addEventListener("mouseenter", () => {
    item.querySelector("button").style.display = "block";
  });
  item.addEventListener("mouseleave", () => {
    item.querySelector("button").style.display = "none";
  });

  item.querySelector("button").addEventListener('click' , ()=>{
    removeMealFromLS(mealId);
    favMeal_container.querySelector('ul').innerHTML = '';
    fetchFavMeals();
  })
  favMeal_container.querySelector('ul').appendChild(favMeal);
}

function fetchFavMeals(){
  const meals = getMealfromLS();
  meals.forEach(id => addTofav(id));
}

async function randerMeals(){
  const searchTerm = search_input.value;
  search_input.value = '';
  const meals = await searchMeal(searchTerm);
  if(meals){
    meals.forEach(meal => {
      addMeal(meal);
    });
  }
}

