import { makeAutoObservable } from "mobx";

export default class ProductOrderStore {
  constructor() {
    this._products = [];
    makeAutoObservable(this);
  }

  setProducts(products) {
    this._products = products;
  }

  get products() {
    return this._products;
  }
}