const apiKey = '2e9578bc56f6764fe1b40a714314425a' ; //alternate apikey = 'a2ee1961b8508b0d8d4478ce7041dc73', '2e9578bc56f6764fe1b40a714314425a', '8c360eed4b614d01fb7d4d4ebe0641b8' ,  '61c48268363932f7b18c2b6bf1054c1b', '8d72f6cee5a275f44a54b15291e4eab0' , '408e560aca60b11f3dcdecf34f6c963f'
let query, rId, likedRecipeArray = [], likedRecipeArray2=[];

let recipe, resultArray, curPage = 1, recipeData, serving, ingredientsValue, ingredientsText;



(function initialiseLikedArray2(){
    
    if(JSON.parse(localStorage.getItem('1'))){
        
    likedRecipeArray2 = JSON.parse(localStorage.getItem('1'));
}
})();

async function getData(){
    
    recipe = await axios(`https://www.food2fork.com/api/search?key=${apiKey}&q=${query}`);
    
    return recipe.data.recipes;
} 

async function getRecipe(recipeId){
    
    recipeData = await axios(`https://www.food2fork.com/api/get?key=${apiKey}&rId=${recipeId}`);
    
    
    displayRecipe(recipeData.data.recipe); 

}

         
function displayRecipe(rData){
    
    var time = Math.round((rData.ingredients.length/3)*10);
    serving = 1;
    var ingredientStr = '';
    
   
    
    ingredientsValue = rData.ingredients.map(cur => {
        
        var splitIngredient = cur.split(' ');
        
        if(typeof(parseFloat(splitIngredient[1])) === 'number' && !isNaN(parseFloat(splitIngredient[1]))){

               //2 numbers
               return (parseInt(eval(splitIngredient[0])) + parseInt(eval(splitIngredient[1])) + 1);
           
           }
        
           else if(typeof(parseFloat(splitIngredient[0])) === 'number' && !isNaN(parseFloat(splitIngredient[0])))
            {
                // 1 number
                return (parseInt(eval(splitIngredient[0])) + 1);
            }
        
            else {
                    //no number, so add 1
                    return 1;
            }
        
    });
    
    ingredientsText = rData.ingredients.map(cur => {
        
        
         var splitIngredient = cur.split(' ');
        
        if(typeof(parseFloat(splitIngredient[1])) === 'number' && !isNaN(parseFloat(splitIngredient[1])) ){
           
               //2 numbers
                splitIngredient.shift();
                splitIngredient.shift();
               return splitIngredient.join(' ');

           }
           else if(typeof(parseFloat(splitIngredient[0])) === 'number' && !isNaN(parseFloat(splitIngredient[0])))
            {
                // 1 number
                splitIngredient.shift();
                return splitIngredient.join(' ');
            }
            else {
                //no number, so add 1
                return splitIngredient.join(' ');
        }
        
    });
    
    
    
    
    for( var i= 0; i< (rData.ingredients.length<10? rData.ingredients.length:10); i++){
        
        ingredientStr += `<div class="single-ingredient"><i class="far fa-check-circle ion-ios-checkmark-outline"></i>${ingredientsValue[i]} ${ingredientsText[i]}</div>
`;
    }
    
   // var isLiked = Boolean(localStorage.getItem(rData.recipe_id))? 'liked' : ''; 
    var isLiked = Boolean(likedRecipeArray2.find(cur => cur.id === `${rData.recipe_id}`)) ? 'liked' : ''; 
    
   
    
    var str = `<div class="particular-image"><img src = ${rData.image_url} class="img"></div>
                    
                    <div class="particular-name">${rData.title}</div> 
                    
                    <div class="particular-description">
                    
                        <div class="particlar-time"><i class="far fa-clock ion-android-alarm-clock"></i>${time} minutes</div>
                        <div class="particular-serving"><i class="fas fa-user-friends ion-ios-people"></i> ${serving} servings <i class="fas fa-minus-circle ion-ios-minus-outline"></i><i class="fas fa-plus-circle ion-ios-plus-outline"></i></div>
                        <div class="particular-like-button"><i class="fas fa-heart icon-heart-like ${isLiked}"></i></div>
                    </div>
                    
                    
                    <div class="particular-ingredients">
                        <div class="all-ingredients">
                            ${ingredientStr}
                        </div>
                        <button type="button" class="add-to-cart" id="cart-button"><i class="fas fa-shopping-cart ion-android-cart"></i> Add to my shopping list</button>
                    </div>
                
                    <div class="particular-directions">
                    
                            <div class="direction-heading">HOW TO COOK IT</div>
                            <div class="direction-text">This recipe was carefully designed and tested by <span class="direction-author">${rData.publisher}.</span> Please check out directions at their website.</div>
                            <a class="direction-button" href =${rData.publisher_url} target = "_blank">DIRECTIONS <i class="fas fa-caret-right ion-arrow-right-b"></i></a>                                       
                    </div>`;
    
    removeLoader('search-particular');
    document.querySelector('.search-particular').insertAdjacentHTML('afterbegin',str);
    
                      
    
}


function clearSection(){
    
    document.querySelector('.search-list').innerHTML = '';
    
    document.querySelector('.search-particular').innerHTML = '';
}


function updateUISearchList(resultArray, page = 1){
  if(page > 0 && page < 4)
  {var start, end;
    
    start = (page-1)*10; //0
    end = (page)*10;     //10
    
    clearSection();
    
    for(start; start<end; start++){
        
        res = resultArray[start];
        
        
        var str = `<div class="search-item" id = ${res.recipe_id}>
                            <img src= ${res.image_url} class="item-image">
                            <div class="item-name"><span class="name-head">${res.title}</span><br>${res.publisher}</div>
                        </div>`

        document.querySelector('.search-list').insertAdjacentHTML('beforeend',str);
        
        
    }
       
    //first page  - right
     if(page === 1){
            
         var rightButton = `<div class = 'buttons'><button type="button" class="button-right" id = "right">Page ${page+1} <i class="fas fa-caret-right"></i></button></div>`;
         
         
           document.querySelector('.search-list').insertAdjacentHTML('beforeend',rightButton);
         
         
     }
    
    //middle page -  left n right
     if(page === 2){
            
         var leftButton = `<div class = 'buttons'><button type="button" class="button-left" id="left"><i class="fas fa-caret-left"></i> Page ${page-1}</button><button type="button" class="button-right" id="right">Page ${page+1} <i class="fas fa-caret-right"></i></button></div>`; 
         
         document.querySelector('.search-list').insertAdjacentHTML('beforeend',leftButton);
        // document.querySelector('.search-list').insertAdjacentHTML('beforeend',rightButton);
        
       
     }
    //last page   - left
     if(page === 3){
     
         var leftButton =`<div class = 'buttons'><button type="button" class="button-left" id="left"><i class="fas fa-caret-left"></i> Page ${page-1}</button><div>`;
         
         document.querySelector('.search-list').insertAdjacentHTML('beforeend',leftButton);
       
     }
  }
}


function pagination(event){
    
    if(event.target.id === 'left'){
        curPage--;
        updateUISearchList(resultArray, curPage);
        
    } 
    if(event.target.id === 'right'){
        curPage++;
        updateUISearchList(resultArray, curPage);
    }
    
    
    
//retriving particular data   
    if(event.target.id !== 'left' && event.target.id !== 'right'){
        
        
        
        var targetId = event.target.closest('.search-item');
        rId = targetId.id;
        
        
        if(rId){
            
            
        //clicked class and adding to approriate item
        var nodeList = document.querySelectorAll('.search-item');
        var arrList = Array.from(nodeList);
        
        arrList.forEach(cur => {
            cur.classList.remove('clicked');
        });
        
        document.getElementById(rId).classList.add('clicked');

        document.querySelector('.search-particular').innerHTML = '';
        renderLoader('search-particular');
        getRecipe(rId);

        }
    
        
    }
}

function displayCart(){
              
    for(var i= 0; i< (recipeData.data.recipe.ingredients.length<10? recipeData.data.recipe.ingredients.length:10); i++ )
        {
            var str = `<div class="shopping-list-item" id=${i}>
                   <input type="number" class="shopping-item-value" value = ${ingredientsValue[i]}>
                    <div class="shopping-item-description">${ingredientsText[i]}</div>
                    <i class="far fa-times-circle delete-icon"></i>
               </div>`;
    
    document.querySelector('.shopping-list-items').insertAdjacentHTML('beforeend',str);
            
        }
    
    
}

function addToCart(event){
    
    if(event.target.id === 'cart-button') displayCart();
     
}

function getInput(){
    
    query = document.querySelector('.search-text').value;
    document.querySelector('.search-text').value = '';
    clearSection();
    renderLoader('search-list');
    
    getData().then(res => {
        resultArray = res;
        updateUISearchList(resultArray);
    });
    
}

function renderLoader(parent){
    
    var str = `<div class="loader"><i class="fas fa-sync-alt"></i></div>`;
    
    document.querySelector(`.${parent}`).insertAdjacentHTML('afterbegin',str);
}


function removeLoader(parent){
    
    document.querySelector(`.${parent}`).innerHTML = '';
}



function deleteItem(event){

    if(event.target.classList.contains('delete-icon')){
    var el = event.target.closest('.shopping-list-item').id;
    document.getElementById(el).parentNode.removeChild(document.getElementById(el));
    }
}




function updateUIservings(){
    
    var ingredientStr = '';
    
    
    
    
    document.querySelector('.particular-serving').innerHTML = `<i class="fas fa-user-friends ion-ios-people"></i> ${serving} servings <i class="fas fa-minus-circle ion-ios-minus-outline"></i><i class="fas fa-plus-circle ion-ios-plus-outline"></i>`;
    
    
    
    document.querySelector('.all-ingredients').innerHTML = '';
    
    for( var i= 0; i< (recipeData.data.recipe.ingredients.length<10? recipeData.data.recipe.ingredients.length:10); i++){
        
        ingredientStr += `<div class="single-ingredient"><i class="far fa-check-circle ion-ios-checkmark-outline"></i>${ingredientsValue[i]} ${ingredientsText[i]}</div> `;
    }
    
    document.querySelector('.all-ingredients').innerHTML = ingredientStr;
    
}



function changeServings(event){
    
    if(event.target.classList.contains('ion-ios-minus-outline') && serving > 1){
        
        ingredientsValue.forEach((cur, i, arr) => {
            arr[i] = cur-1;
        });
        serving--;
    
        updateUIservings();
    }
    
    if(event.target.classList.contains('ion-ios-plus-outline')){
        
        ingredientsValue.forEach((cur, i, arr) => {
         arr[i] = cur+1;
        });
        serving++;
        updateUIservings();
    }
}

//function constructor for liked recipe
function likedRecipeObject(id, title, publisher, imageUrl){
    
    this.id = id;
    this.title = title;
    this.publisher = publisher;
    this.imageUrl = imageUrl; 
}


//adding liked recipe in local storage
function likedRecipe(){
    
    if(event.target.classList.contains('icon-heart-like')){
        
        if(!document.querySelector('.icon-heart-like').classList.contains('liked')){   //to add new like
        
           //change color of icon
        document.querySelector('.icon-heart-like').classList.toggle('liked');
        
        //create object for liked array: add recipe details
        likedRecipeArray2[likedRecipeArray2.length] = new likedRecipeObject(recipeData.data.recipe.recipe_id, recipeData.data.recipe.title, recipeData.data.recipe.publisher, recipeData.data.recipe.image_url);
            
            
          //  likedRecipeArray2[likedRecipeArray2.length] = likedRecipeArray[likedRecipeCount];
       
            if(document.querySelector('.icon-heart-search').classList.contains('display')){
              renderLikedRecipesMenu();
            }
        
        //add this object in local storage
       // localStorage.setItem(likedRecipeArray[likedRecipeCount].id,JSON.stringify(likedRecipeArray[likedRecipeCount]));
            localStorage.setItem('1',JSON.stringify(likedRecipeArray2));
       // likedRecipeCount++;
        }
        
        
        
        
        
        
        else if(document.querySelector('.icon-heart-like').classList.contains('liked')){ //to remove existing like
            
        //change color of icon
        document.querySelector('.icon-heart-like').classList.toggle('liked');
        
        //create object for liked array: add recipe details

        var index = likedRecipeArray.findIndex(cur => cur.id === recipeData.data.recipe.recipe_id);
        likedRecipeArray.splice(index,1);
      //  likedRecipeCount--;
            
        var index2 = likedRecipeArray2.findIndex(cur => cur.id === recipeData.data.recipe.recipe_id);
        likedRecipeArray2.splice(index2,1);
            
              if(document.querySelector('.icon-heart-search').classList.contains('display')){
              renderLikedRecipesMenu();
            }
        
        //delete this object from local storage
        localStorage.removeItem(recipeData.data.recipe.recipe_id);
        //updating array object in local storage
        localStorage.setItem('1',JSON.stringify(likedRecipeArray2));
    }
        
    }
}

function renderLikedRecipesMenu(){
   
    document.querySelector('.liked-recipes').innerHTML = '';
    
    likedRecipeArray2.forEach((cur) => {
            
            var str = ` <div class="liked-search-item" id='l${cur.id}'>
                        <img src=${cur.imageUrl}  class="liked-item-image">
                        <div class="liked-item-name"><span class="liked-name-head">${cur.title}</span><br>${cur.publisher}</div>
                </div>`;
            
            document.querySelector('.liked-recipes').insertAdjacentHTML('beforeend', str);
            
            
            
        });
}


function displayLikedRecipes(){
    
    if(!document.querySelector('.icon-heart-search').classList.contains('display')){
       
         document.querySelector('.icon-heart-search').classList.add('display');
         document.querySelector('.liked-recipes').classList.add('display-liked');
        
        renderLikedRecipesMenu();
        
       }
       
       else {
             document.querySelector('.icon-heart-search').classList.remove('display');
           document.querySelector('.liked-recipes').classList.remove('display-liked');
            document.querySelector('.liked-recipes').innerHTML = '';
       }
    
   
}

function displayRecipeFromList(event){
    
       var targetId = event.target.closest('.liked-search-item');
        rId = targetId.id;
        rId = rId.split('l');
        rId = rId[1];
    
        
        
        
        if(rId){
            
                
        //clicked class and adding to approriate item
        var nodeList = document.querySelectorAll('.liked-search-item');
        var arrList = Array.from(nodeList);
        
        arrList.forEach(cur => {
            cur.classList.remove('clicked');
        });
    
        var nodeList = document.querySelectorAll('.search-item');
        var arrList = Array.from(nodeList);
        
        arrList.forEach(cur => {
            cur.classList.remove('clicked');
        });
            
        document.getElementById(`l${rId}`).classList.add('clicked');
        document.querySelector('.search-particular').innerHTML = '';
        renderLoader('search-particular');
        getRecipe(rId);
            
        }
    
}


//Event listeners
//search button
document.querySelector('.btn-search').addEventListener('click',getInput);

//pagination buttons
document.querySelector('.search-list').addEventListener('click', pagination);

//add to cart button
document.querySelector('.search-particular').addEventListener('click',addToCart); 

//delete item from cart
document.querySelector('.shopping-list-items').addEventListener('click', deleteItem);

// minus/plus button
document.querySelector('.search-particular').addEventListener('click', changeServings);

//like button
document.querySelector('.search-particular').addEventListener('click', likedRecipe);

//display like button
document.querySelector('.icon-heart-search').addEventListener('click', displayLikedRecipes);

//displaying liked recipe from menu
document.querySelector('.liked-recipes').addEventListener('click',displayRecipeFromList);