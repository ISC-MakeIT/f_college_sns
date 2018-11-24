import {ProductType, ProductList} from '../entities';
import {ApiClient} from '../infrastructure';
import {ProductFactory, UserFactory} from '../factories';
import {ProductListFactory, ProductJsonProps} from '../factories/product_list';
import { ApplicationManager } from '../application_manager';
import { ProductVoteItem } from '../components';

export interface ProductTypes {
    fashion: ProductList[];
    beauty: ProductList[];
}

export class ProductService {

    public static async getAll() {
        const res = await ApiClient.get('/products/');

        const data: ProductTypes = {
            fashion: [],
            beauty: [],
        };

        res.fashion.forEach((d: ProductJsonProps) => data.fashion.push(ProductListFactory.createFromJSON(d)));
        res.beauty.forEach((d: ProductJsonProps) => data.beauty.push(ProductListFactory.createFromJSON(d)));
        return data;
    }

    public static async getVotedProducts() {
        const appManager = ApplicationManager.instance;

        let beautyProducts: any = [];
        if (appManager.voteIds.beauty && appManager.voteIds.beauty.length > 0) {
            beautyProducts = await ProductService.asyncMap(appManager.voteIds.beauty, async (id: number) => {
                return await ProductService.get(id);
            });
        }

        let fashionProducts: any = [];
        if (appManager.voteIds.fashion && appManager.voteIds.fashion.length > 0) {
            fashionProducts = await ProductService.asyncMap(appManager.voteIds.fashion, async (id: number) => {
                return await ProductService.get(id);
            });
        }

        return { beauty: beautyProducts, fashion: fashionProducts};
    }

    public static entryOrder2ProductIdMapperByValue(genre: ProductType, value: number) {
        return genre === 'BEAUTY' ? this.beautyEntryOrder2ProductIdMap().get(value) : this.fashionEntryOrder2ProductIdMap().get(value);
    }

    public static productId2EntryOrderMapperByValue(genre: ProductType, value: number) {
        return genre === 'BEAUTY' ? this.beautyProductId2EntryOrderMap().get(value) : this.fashionProductId2EntryOrderMap().get(value);
    }

    public static async get(id: number) {
        const res = await ApiClient.get(`/products/${id}`);
        const product = ProductFactory.createFromJSON(res);
        return product;
    }

    // https://qiita.com/janus_wel/items/1dc491d866f49af76e98
    public static async asyncMap(array: any[], operation: (arg0: any) => void) {
        return Promise.all(array.map(async item => await operation(item)));
    }

    private static fashionProductId2EntryOrderMap() {
        // productId, entryOrder
        return new Map([
            [21, 1],
            [22, 2],
            [23, 5],
            [24, 29],
            [25, 4],
            [26, 3],
            [27, 23],
            [28, 27],
            [29, 18],
            [30, 12],
            [31, 19],
            [32, 11],
            [33, 17],
            [34, 6],
            [35, 8],
            [36, 14],
            [37, 22],
            [38, 28],
            [39, 24],
            [40, 7],
            [41, 13],
            [42, 16],
            [43, 25],
            [44, 30],
            [45, 21],
            [46, 20],
            [47, 26],
            [48, 10],
            [49, 9],
            [50, 15],
        ]);
    }

    private static beautyProductId2EntryOrderMap() {
        return new Map([
            [1, 5],
            [2, 16],
            [3, 6],
            [4, 14],
            [5, 19],
            [6, 1],
            [7, 20],
            [8, 4],
            [9, 12],
            [10, 10],
            [11, 3],
            [12, 18],
            [13, 13],
            [14, 2],
            [15, 7],
            [16, 11],
            [17, 9],
            [18, 15],
            [19, 8],
            [20, 17],
        ]);
    }

    private static fashionEntryOrder2ProductIdMap() {
        return new Map([
            [1, 21],
            [2, 22],
            [3, 26],
            [4, 25],
            [5, 23],
            [6, 34],
            [7, 40],
            [8, 35],
            [9, 49],
            [10, 48],
            [11, 32],
            [12, 30],
            [13, 41],
            [14, 36],
            [15, 50],
            [16, 42],
            [17, 33],
            [18, 29],
            [19, 31],
            [20, 46],
            [21, 45],
            [22, 37],
            [23, 27],
            [24, 39],
            [25, 43],
            [26, 47],
            [27, 28],
            [28, 38],
            [29, 24],
            [30, 44],
        ]);
    }

    private static beautyEntryOrder2ProductIdMap() {
        return new Map([
            [1, 6],
            [2, 14],
            [3, 11],
            [4, 8],
            [5, 1],
            [6, 3],
            [7, 15],
            [8, 19],
            [9, 17],
            [10, 10],
            [11, 16],
            [12, 9],
            [13, 13],
            [14, 4],
            [15, 18],
            [16, 2],
            [17, 20],
            [18, 12],
            [19, 5],
            [20, 7],
        ]);
    }
}
