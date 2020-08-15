import axios from "axios";


//this is the recipe model
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            //this adds to the data model
            this.recipeTitle = res.data.recipe.title;
            this.recipeAuthor = res.data.recipe.publisher;
            this.recipeImg = res.data.recipe.image_url;
            this.recipeUrl = res.data.recipe.source_url;
            //going to bring up an array of ingredients
            this.recipeIngredients = res.data.recipe.ingredients;
            //console.log(res);

        } catch(error) {
            alert(error);
        }
    }

    calcTimeServ() {
        //this assumes 15 mins for each 3 ingredients
        //this assumes that per 4 ingredients is 1 serving
        const numIngredients = this.recipeIngredients.length;
        const periods = Math.ceil(numIngredients / 3);
        const serving = Math.ceil(numIngredients / 4);
        this.time = periods * 15;
        this.servings = serving;
    }


    //part 5
    //homepage button
    //show original method
    //created method
    //added two arrays and mapped throug to set each to lowercase and then for each in unitLong replace with unitShort
    //replace parenthesis with space or nothing
    //create array by splitting at ' '
    //created unitIndex by finding the index in the newly split arrays. Find index where arrIngredients includes unitsShort
    //if unit index was greater than -1 unit, parseInt(arrIng[0] === true) maybe unit, === -1 no unit
    //1) create new array by slice at 0 to unitIndex, aka how many there were
    //   - if array length === 1 set count = to first index and replace - with +
     //   - else evaluate array ingredients sliced at 0, to unit index and join with + 

    //   set count = count, unit = arrIngredients[unitIndex] and ingredient to arrIngredients.slice(unitIndex + 1).join(' ')
    //2) set count = parseInt(arrIng[0]), unit '', and ingredient to arrIngredients.slice(1).join(' ')
    //3) set count = 1, unit '', ingredient to ingredient
    //set ingredients to the new ingredients


    //-------------------------------------------------------------

    //first created new file and function renderRecipe (displays on the ui)
    //took html elements and put them into the new function, using template literals added elements from recipe
    //then for ingredients mapped throught the array and for each ingedients added it to the ui
    //then we appended the recipe to the html file
    //imported it in the index.js file controller
    //called it when id is found, and display on UI
    //added the loader, and removed when found
    //cleared input if new id was clicked


    



    parseIngredients() {
        //loop through unitslong and replace with unitsshort
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds' ];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, "g", "kg"];

        const newIngredients = this.recipeIngredients.map(el=> {
            //uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            });

            //remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //parse ingredients into count, unit and ingredient
            //constant that splits each ingredient by space
            //and makes array
            const arrIngredients = ingredient.split(' ');
            //Sconsole.log(arrIngredients);

            const unitIndex = arrIngredients.findIndex(el2 => units.includes(el2));
            //Pconsole.log(unitIndex);

                //tests each elements in the arrIng array and
                //checks where it is
            let objIngredient;
///////////////////////////////////Check here///////////////////////////////
            if(unitIndex > -1) {
                //there is a unit
                //example: 4 1/2 will be [4, 1/2] eval("4+1/2") --> 4.5
                //Example 4 cups, arrcount = [4]P
                const arrCount = arrIngredients.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIngredients[0].replace('-', '+'));
                } else {
                    count = eval(arrIngredients.slice(0, unitIndex).join('+'));
                }

                objIngredient = {
                    count,
                    unit: arrIngredients[unitIndex],
                    ingredient: arrIngredients.slice(unitIndex + 1).join(' ')

                }

            } else if (parseInt(arrIngredients[0], 10)) {
                // there is no unit, but 1st element is a #
                objIngredient = {
                    count: parseInt(arrIngredients[0], 10),
                    unit: '',
                    ingredient: arrIngredients.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                }
                //there is no unit and no number
            }
            return objIngredient;
        });

        this.recipeIngredients = newIngredients;

    }
}
