import { makeAutoObservable } from "mobx";

export default class CategoryStore {
  constructor() {
    this._categorys = [];
    this._categoryId = 0;
    makeAutoObservable(this);
  }

  setCategorys(categorys) {
    this._categorys = categorys;
  }

  setCategoryId(categoryId) {
    this._categoryId = categoryId;
  }

  get categorys() {
    return this._categorys;
  }

  get categoryId() {
    return this._categoryId;
  }
}
