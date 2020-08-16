import uniqid from "uniqid";


export default class List {
    constructor() {
        //All items in shopping list will be stored here
        //Object w/ count unit and ing
        this.items = [];
    }

    //adds item when clicked
    additem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);

    }

    //deletes portion of the array
    //[2,4,6] splice(1,1) return [2,6]
    deleteItem (id) {
        const idIndex = this.items.findIndex(e => e.id === id);
        //splice at index and 1 element
        this.items.splice(idIndex, 1);
    }
    
    //a way to update the count when it is in the shopping list
    updateCount(id, nC) {
        this.items.find(e => e.id === id).count = nC;
    }
}