import { makeAutoObservable } from "mobx";

export default class OrderStore {
  constructor() {
    this._orders = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this);
  }

  setOrders(orders) {
    this._orders = orders;
  }

  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get orders() {
    return this._orders;
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
}
