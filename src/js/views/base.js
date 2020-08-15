import $ from "jquery";

export const elements = {
    searchForm: $('.search'),
    searchInput: $('.search__field'),
    searchRes: $('.results'),
    searchResultsList: $('.results__list'),
    searchResultsPages: $('.results__pages'),
    windowResult: $(window),
    recipeDiv: $('.recipe')
}
//add domstrings object
export const domStrings = {
    div: "div",
    loader: "loader",
    inlineButton: "btn-inline"
}

//clear the loader method for when the results show up
export const clearLoader = () => {
    const loader = $(`.${domStrings.loader}`);
    if(loader) {
        $(domStrings.div).remove(`.${domStrings.loader}`);
    }
}

//create a loader screen for when we are waiting for output
export const renderLoader = parent => {
    const loaderDiv = `
        <div class = "${domStrings.loader}">
            <svg>
                <use href = "img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `
    return parent.prepend(loaderDiv);
}