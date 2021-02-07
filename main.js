const text = document.getElementById('search_box')
const btn = document.getElementById("search_btn")
const resSec = document.querySelector(".results")
const popup = document.getElementById("popup")
let found_results

async function get_meals(search){
    const results = await fetch(search)
    const data = await results.json()
    found_results = data
    data.meals.forEach( e => display_results(e.strMeal, e.strMealThumb, e.idMeal))
}

function display_results(mealName, mealImg, mealId){
    resSec.innerHTML = resSec.innerHTML + `
    <div class="mealCard">
    <img class="mealImg" src="${mealImg}">
    <h3 class="mealName" onclick="title_action()">${mealName}</h3>
    </div>`
}

function action(e){
    let user_text = text.value;
    resSec.innerHTML= "";
    try{
        let search = `https://www.themealdb.com/api/json/v1/1/search.php?f=${user_text[0].toLowerCase()}`
        get_meals(search)
    }catch(err){
        console.log(err)
        resSec.innerHTML = `<h1>Faced Some Error</h1>`
    }
    
}

function title_action(e){
    console.log(e)
    popup.style.display = 'block'
    document.body.style.overflow = "hidden"
    popup.children[0].setAttribute('src', "https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg")
}

btn.addEventListener("click", action);