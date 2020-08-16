import { elements } from './base';
import $ from "jquery";

//select the id of the item base on its id
//and the data attribute
//add all the units from the item inputed
export const renderItem = item => {
    const markUp = `
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value=${item.count} step=${item.count} class = "shopping__count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;

    elements.shopping.prepend(markUp);
};


//delete item
//the id inputed catch it with $ selector and then remove
////////////////////////////////////////
export const deleteItem = id => {
    const item = $(`[data-itemid=${id}`)
    if (item) item.remove();
}
