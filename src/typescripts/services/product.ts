import { Product } from '../entities';

export class ProductService {
    public static async get(id: number) {
        // APIにぶん投げるか
        // if (this.)
    }

    public static async getAll() {
        const array = [];
        for (let i = 0; i < 3; i++) {
            const p = new Product( i, `${i}さん`, `this concept is hogehoge`, `${i}_hoge` );
            array.push(p);
        }
        return array;
    }
}
