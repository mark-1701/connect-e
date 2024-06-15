export default class Product {
    id;
    name;
    brand;
    price;
    category;
    warranty;
    description;
    uriImage;
    constructor(id, name, brand, price, category, warranty, description, uriImage) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.category = category;
        this.warranty = warranty;
        this.description = description;
        this.uriImage = uriImage;
    }
}
