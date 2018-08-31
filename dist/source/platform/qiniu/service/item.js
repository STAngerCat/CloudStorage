"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Item extends base_1.Base {
    list(bucket, marker = "", limit = 1000, prefix = "", delimiter = "") {
        let url = `http://rsf.qbox.me/list?bucket=${bucket}&marker=${marker}&limit=${limit}&prefix=${prefix}&delimiter=${delimiter}`;
        this.get(url).then(response => {
            console.log(response.result.json());
        });
    }
}
exports.Item = Item;
let nb = new Item("pKqdGJdw6XHe5ys8HI6tgB3cPdH9UONyyyuM6p-K", "BUfCgFGUuYhhyw1gUwXZo9mfT2yruzBoZyzIhWbk");
nb.list("wordpress");
