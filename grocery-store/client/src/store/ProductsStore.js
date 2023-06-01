import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._products = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 12;
    this._totalQuantity = 0;
    makeAutoObservable(this);
  }

  setProducts(products) {
    this._products = products;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  setTotalQuantity(quantity) {
    this._totalQuantity = quantity;
  }

  get products() {
    return this._products;
  }

  get totalCount() {
    return this._totalCount;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  get totalQuantity() {
    return this._totalQuantity;
  }
}
