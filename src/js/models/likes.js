export default class Likes {
    constructor() {
        this.likes = [];
    }
    //takes the inputs id, title, author and img 
    //adds them to the likes array
    addLike(id, title, author, img) {
        const like = {
            id, 
            title, 
            author, 
            img
        };
        this.likes.push(like);

        //add data to local storage
        this.dataPersist();

        return like;
    }

    //takes the id finds index and removes
    deleteLike (id) {
        const index = this.likes.findIndex(e => e.id === id);
        this.likes.splice(index, 1);
        
        //remove data from local storage
        this.dataPersist();
    }
    //takes the id finds index and checks if it is different from -1
    isItLiked(id) {
        return this.likes.findIndex(e => e.id === id) !== -1;
    }

    //returns the number of likes
    getNumLikes() {
        return this.likes.length;
    }

    //adds the data to local storage!
    dataPersist() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    //gets the item back from local storage
    readData() {
        const el = JSON.parse(localStorage.getItem('likes'));
        //restore from local storage
        if (el) this.likes = el;
    }
}
