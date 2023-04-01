import { makeAutoObservable } from "mobx";

export default class CategoryStore {
    constructor() {
        this._categorys = [
            { id: 1, name: "Молоко, Сыр", img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png` },
            { id: 2, name: "Хлеб, булки", img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png` },
            { id: 3, name: "Напитки", img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png` },
            { id: 4, name: "Мясо, рыба", img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png` },
        ]
        makeAutoObservable(this);
    }

    set categorys(categorys) {
        this._categorys = categorys;
    }

    get categorys() {
        return this._categorys;
    }
}