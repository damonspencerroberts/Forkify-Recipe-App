import $ from "jquery";
import {
    elements
} from "./base";
import * as searchView from "./searchView";

//toggle button if it is liked or not
export const likeToggleBtn = isItLiked => {
    const iconString = isItLiked ? 'icon-heart' : 'icon-heart-outlined';
    $('.recipe__love use').attr(`href`, `img/icons.svg#${iconString}`);
    //set icon = to the ternary above to like or dislike
}

//if number of likes > 0 then likes menu should be visible
//otherwise it should be hidden
export const likeMenuToggle = numLikes => {
    elements.likesMenu.css('visibility', numLikes > 0 ? 'visible' : 'hidden')
}

//append the liked ingredients to the ui
//this is done through adding elements specified in the likes class to the html markup
export const displayLikeMenu = likedItems => {
    const markUp = `
    <li>
        <a class="likes__link" href="/#${likedItems.id}">
            <figure class="likes__fig">
                <img src=${likedItems.img} alt=${likedItems.title}>
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${searchView.recipeTitleLimit(likedItems.title)}</h4>
                <p class="likes__author">${likedItems.author}</p>
            </div>
        </a>
    </li>
    `
    elements.likelist.append(markUp);
};

//method to remove the item from the menu bar tap into the class of id then remove parent
export const removeLikeMenuItem = id => {
    const el = $(`a[href="/#${id}"]`).parent("li");

    if (el) el.remove();
}