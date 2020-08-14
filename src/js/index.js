import Search from "./models/Search";
import { elements, renderLoader, clearLoader, domStrings } from "./views/base";
import * as searchView from "./views/searchView";
import Recipe from "./models/recipe";



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
        
        //4)search for recipes
        await state.search.getResults();

        //5)render results on ui
        //watch out here
        searchView.renderResults(state.search.result);
        // clear loader methodS
        clearLoader();
        //console.log(state.search.result)
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
 */

 //created from the R class constructor
 const r = new Recipe(35477);
 r.getRecipe();
 //r.calcTime();
 //r.calcServings();
 console.log(r);


