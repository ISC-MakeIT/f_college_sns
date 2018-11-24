import { ApiClient } from '../infrastructure';
import {ProductListFactory, ProductJsonProps} from '../factories/product_list';

export class RankingService {
    public static async ranking() {
        const res = await ApiClient.get('/ranking');
        const data: any = {fashion: [], beauty: []};
        res.fashion.forEach((d: ProductJsonProps) => data.fashion.push(ProductListFactory.createFromJSON(d)));
        res.beauty.forEach((d: ProductJsonProps) => data.beauty.push(ProductListFactory.createFromJSON(d)));

        return data;
    }
}
