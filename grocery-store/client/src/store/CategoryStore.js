import { makeAutoObservable } from "mobx";

export default class CategoryStore {
    constructor() {
        this._categorys = []
        makeAutoObservable(this);
    }

    setCategorys(categorys) {
        this._categorys = categorys;
    }

    get categorys() {
        return this._categorys;
    }
}