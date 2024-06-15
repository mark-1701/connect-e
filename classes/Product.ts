export default class Product {
  constructor(
    public id: string,
    public name: string,
    public brand: string,
    public price: string,
    public category: string,
    public warranty: string,
    public description: string,
    public uriImage: string
  ) {}
}
