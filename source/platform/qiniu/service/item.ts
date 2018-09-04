import { Base } from "./base";
import { urlsafeBase64Encode } from "../../../util/string";

export class Item extends Base {
    list(bucket: string, 
        marker: string = "", 
        limit: number = 1000, 
        prefix: string = "", 
        delimiter: string = "") {

        let url = `http://rsf.qbox.me/list?bucket=${bucket}&marker=${marker}&limit=${limit}&prefix=${prefix}&delimiter=${delimiter}`

        this.get(url).then(response => {
            console.log(response.result.json())
        })
    }
}

let nb = new Item("pKqdGJdw6XHe5ys8HI6tgB3cPdH9UONyyyuM6p-K", "BUfCgFGUuYhhyw1gUwXZo9mfT2yruzBoZyzIhWbk")
nb.list("wordpress")