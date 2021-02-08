const text = document.getElementById('search_box')
const btn = document.getElementById("search_btn")
const resSec = document.querySelector(".results")
const popup = document.getElementById("popup")
let found_results
let single_meal
let temp

async function get_meals(search, whom_to_return = 1){
    const results = await fetch(search)
    const data = await results.json()
    if(data.meals == null){
        resSec.innerHTML = `<h1>No Results Found</h1>`
        return
    }
    if(whom_to_return === 1){
        found_results = data
        data.meals.forEach( e => display_results(e.strMeal, e.strMealThumb, e.idMeal))
    }else{
        single_meal = data.meals[0]
    }
}

function display_results(mealName, mealImg, mealId){
    resSec.innerHTML = resSec.innerHTML + `
    <div class="mealCard">
    <img class="mealImg" src="${mealImg}">
    <h3 class="mealName" onclick="title_action(event, ${mealId})">${mealName}</h3>
    </div>`
}

function action(e){
    let user_text = text.value;
    resSec.innerHTML= "";
    try{
        let search = `https://www.themealdb.com/api/json/v1/1/search.php?s=${user_text.toLowerCase()}`
        get_meals(search)
    }catch(err){
        resSec.innerHTML = `<h1>Faced Some Error</h1>`
    }
    
}


function addIng(){
    const ingUL = document.getElementById("ingredients")
    ingUL.innerHTML = ""
    
    for(i = 1; i<= 20; i++){
        let str = "strIngredient" + i
        let str2 = "strMeasure" + i
        if(!single_meal[str] == ''){
            ingUL.innerHTML = ingUL.innerHTML + `<li>Ingredient${i}: ${single_meal[str]}, Quantity: ${single_meal[str2]}</li>
            <li></li>`

        }else{
            return
        }
    }
}


async function title_action(e, mealId){
    const mealTitle = document.getElementById("mealTitle")
    const mealDisc = document.getElementById("mealDisc")
    const api_url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    await get_meals(api_url, 2)
    popup.style.display = 'flex'
    resSec.style.display = 'none'
    popup.children[0].setAttribute('src', single_meal.strMealThumb)
    mealTitle.innerText = single_meal.strMeal
    mealDisc.innerText = single_meal.strInstructions
    document.getElementById("area").innerText = "Origin: "+single_meal.strArea
    document.getElementById("cat").innerText = "Category "+single_meal.strCategory
    document.getElementById("tags").innerText = "Tags: "+single_meal.strTags
    addIng()
}

function closePopup(e){
    popup.style.display = 'none'
    resSec.style.display = 'grid'
    document.body.style.overflow = "auto"
}

btn.addEventListener("click", action);