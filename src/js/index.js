import Search from "./models/Search";
import {
    elements,
    renderLoader,
    clearLoader,
    domStrings,
    windowResult
} from "./views/base";
import * as searchView from "./views/searchView";
import Recipe from "./models/recipe";
import * as recipeView from "./views/recipeView";



/**
 * Search Object
 * current recipe object
 * shopping list object
 * liked recipe
 */

const state = {};

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
        } catch(error) {
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
    console.log(id);
    //checks if there is an id in the url, (i.e not home)
    if (id) {
        //prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipeDiv);
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
            recipeView.renderRecipe(state.recipe);
           

            console.log(state.recipe);
        } catch (error) {
            alert(error);
        }
    }

};


['hashchange', 'load'].forEach(e =>
    elements.windowResult.on(e, recipeController));
