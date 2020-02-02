export class Product {
    title:string;
    price:number;
    imageUrl:string;
    category:string;

    constructor(title, price, imageUrl, category) {
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
    }


}