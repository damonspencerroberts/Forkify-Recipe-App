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

    calcTime() {
        //this assumes 15 mins for each 3 ingredients
        const numIngredients = this.recipeIngredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        //this assumes each four ingredients accounts for 1 serving
        const amtIngredients = this.recipeIngredients.length;
        const servings = Math.ceil(amtIngredients / 3);
        this.finalServings = servings * 15;
    }
}
