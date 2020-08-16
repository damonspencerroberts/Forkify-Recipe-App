import {elements} from "./base";
import $ from "jquery";

//takes the value inputed by the useer
export const getInput = () => elements.searchInput.val();

//clears input while searching
export const clearInput = () => elements.searchInput.val('');

//clears the results so new things can be added
export const clearResults = () => {
    elements.searchResultsList.html('');
    elements.searchResultsPages.html('');
}

//remove the hightlight then add the highlights
export const highlightSelected = id => {
    $(".results__link").removeClass("results__link--active");
    $(`a[href="#${id}"]`).addClass("results__link--active");
}

const recipeTitleLimit = (title, limit = 17) => {
    const newTitle = [];
    //if the title.length is greater than preset limit
    if (title.length > limit) {
        //take title and split it by space
        //turns into array by space
        //0 is set as initial (accum) value, callback takes
        //value of accumulator and current value
        title.split(' ').reduce((acc, cur) =>{
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length        
        }, 0);
        //return the result
        //joins the array by spaces...
        return `${newTitle.join(' ')}...`;
    }
    return title;
};


export const renderRecipe = recipe => {
    //jquery to add the html to the file on top of eachother
    //this uses the append method
    const markUp = 
    `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
         <figure class="results__fig">
             <img src="${recipe.image_url}" alt="${recipeTitleLimit(recipe.title)}">
         </figure>
         <div class="results__data">
             <h4 class="results__name">${recipeTitleLimit(recipe.title)}</h4>
             <p class="results__author">${recipe.publisher}</p>
         </div>
        </a>
    </li>
    `;

    elements.searchResultsList.append(markUp);

};
//type prev or next
const createButton = (page, type) => {
    const crButton = `
    <button class="btn-inline results__btn--${type}" data-page = ${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        
    </button>
    `;
    return crButton;

}

const renderButtons = (page, numResults, resPerPage) => {
    //takes the amount of results(i.e 28), divides by 
    //res per page(i.e 10) and we get rounded 3 so 3 pageSP
    //and three buttons
    const pages = Math.ceil(numResults / resPerPage);
    //console.log(`Amount of Pages : ${pages}`);

    let button;
    
    if (page === 1 && pages > 1) {
        button = createButton(1, 'next');

    } else if (page < pages) {
        button = `
        ${createButton(2, 'prev')}
        ${createButton(2, 'next')}`;

    } else if (page === pages && pages > 1) {
        button = createButton(3, 'prev');
    } else {
        console.log('error');
    }

    elements.searchResultsPages.prepend(button);
};



export const renderResults = (recipes, page = 1, perPage = 10) => {
    //render results of current page 
    const start = (page - 1) * perPage;
    const end = page * perPage;
    
    //loops through each item in the array of recipes
    recipes.slice(start, end).forEach(renderRecipe);

    //console.log(recipes);
    //page buttons
    renderButtons(page, recipes.length, perPage);
};
