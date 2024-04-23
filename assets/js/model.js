export default class {
  constructor(name, address, cuisines, rating) {
    this.name = name;
    this._address = address;
    this._cuisines = cuisines;
    this._rating = rating;
  }
  get address() {
    return `${this._address.firstLine}, ${this._address.city}, ${this._address.postalCode}`;
  }
  get cuisines() {
    return this._cuisines.map(function (cuisine) {
      return cuisine.name;
    });
  }
  get ratings() {
    return `${this._rating.starRating} (${this._rating.count} reviews)`;
  }
}
