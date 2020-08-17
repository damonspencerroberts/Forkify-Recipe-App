import Search from "./models/Search";
import {
    elements,
    renderLoader,
    clearLoader,
    domStrings
} from "./views/base";
import * as searchView from "./views/searchView";
import Recipe from "./models/recipe";
import * as recipeView from "./views/recipeView";
import List from "./models/shopping";
import {
    renderItem,
    deleteItem
} from "./views/shoppingView";
import Likes from "./models/likes";
import {
    likeToggleBtn,
    likeMenuToggle,
    displayLikeMenu,
    removeLikeMenuItem
} from "./views/likesView";


/**
 * Search Object
 * current recipe object
 * shopping list object
 * liked recipe
 */

const state = {};
//allows us to see the state in the console
window.state = state;
/**
 * Seach Controller
 */

const controlSearch = async () => {
    //1) get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        //const search = new Search('pizza');
        //console.log(search);
        //search.getResults();
        //2)new search object and add to state
        state.search = new Search(query);

        //3)prepare ui for results
        searchView.clearInput();
        searchView.clearResults();
        //add the renderLoader method
        renderLoader(elements.searchRes);
        try {
            //4)search for recipes
            await state.search.getResults();

            //5)render results on ui
            //watch out here
            searchView.renderResults(state.search.result);
            // clear loader methodS
            clearLoader();
            //console.log(state.search.result)
        } catch (error) {
            alert("Error Fetching Results on search")
            clearLoader();
        }
    }
}

elements.searchForm.submit(e => {
    e.preventDefault();
    controlSearch();

})

//click on the targetSP
elements.searchResultsPages.click(e => {
    const closeButton = e.target.closest(`.${domStrings.inlineButton}`);
    if (closeButton) {
        const goTo = parseInt(closeButton.dataset.page, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goTo);
        //console.log(goTo);
    }
});



/**
 * Recipe Controller
 

 //created from the R class constructor
 const r = new Recipe(35477);
 r.getRecipe();
console.log(r)*/

//needed to add the function up here
const recipeController = async () => {
    //gets the location of the id from the hash symbol in the url
    //replace the hash symbol with nothing

    //must use state
    const id = window.location.hash.replace("#", "");
    //console.log(id);
    //checks if there is an id in the url, (i.e not home)
    if (id) {
        //prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipeDiv);

        //highlight the selected search iten

        if (state.search) {
            searchView.highlightSelected(id);
        }



        //create new recipe object
        state.recipe = new Recipe(id);
        try {
            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //calculate servings and time
            state.recipe.calcTimeServ();
            //render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isItLiked(id)
            );


            console.log(state.recipe);
        } catch (error) {
            alert(error);
        }
    }

};




['hashchange', 'load'].forEach(e =>
    elements.windowResult.on(e, recipeController));

/**
 * List Controller
 */




//create the list controller and call it down below
const listController = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.recipeIngredients.forEach(e => {
        const item = state.list.addItem(e.count, e.unit, e.ingredient);
        renderItem(item);
    });
}

//const id is the clost of target of the click
//use the dataset attribute method
elements.shopping.click(e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //handle the delete method
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);

        //delete from the UI
        deleteItem(id);

        //handle count update
    } else if (e.target.matches('.shopping__count-value, .shopping__count-value *')) {
        const v = parseFloat(e.target.value, 10) //the ,10 gives the decimal
        state.list.updateCount(id, v)
    }

});


/**
 * Likes controller
 */
//state.likes = new Likes();
//likeMenuToggle(state.likes.getNumLikes());


const likeController = () => {
    //check if likes exist yet, create new likes object
    if (!state.likes) state.likes = new Likes();
    //variable for id
    const curId = state.recipe.id;
    //checks to see if liked is false
    //user hasnt liked the recipe yet
    if (!state.likes.isItLiked(curId)) {
        //add like to the state
        //add the cur variables to like object state
        const nL = state.likes.addLike(
            curId,
            state.recipe.recipeTitle,
            state.recipe.recipeAuthor,
            state.recipe.recipeImg
        )

        //toggle the like button
        //liking the recipe so set to true
        likeToggleBtn(true);
        //add like to the ui list
        displayLikeMenu(nL);

        console.log(state.likes);



    } else { //user has liked the like button
        //delete like to the state
        state.likes.deleteLike(curId);

        //toggle the like button
        //unliking the recipe so set to false
        likeToggleBtn(false);
        //delete like to the ui list
        removeLikeMenuItem(curId);

        console.log(state.likes);
    }
    //removes the column button when there is 0 likes
    likeMenuToggle(state.likes.getNumLikes());
}

//Restore liked recipes everytime the page loads
const windowLoading = () => {
    state.likes = new Likes();
    //restore the likes
    state.likes.readData();
    //button is displayed as such
    likeMenuToggle(state.likes.getNumLikes());
    //render the existing likes
    state.likes.likes.forEach(e => displayLikeMenu(e));

};

//on window load add the window loaded starting elements
elements.windowResult.on('load', windowLoading);

//Handling recipe button clicks
elements.recipeDiv.click(e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsView(state.recipe);
        }
    } else if (e.target.matches('.btn-increse, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsView(state.recipe);
    } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        //catch the click of button in recipeadd button or child elements
        listController();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //catch the click of the like button
        likeController();

    }
    //console.log(state.recipe);

});