import {Product, ProductList} from '../entities';
import {ApiClient} from '../infrastructure';
import {ProductFactory, UserFactory} from '../factories';
import {UserService} from './user';
import {PhotoService} from './photo';
import { ProductListFactory } from '../factories/product_list';

interface ProductProps {
    product_id: number;
    entry_order: number;
    product_number: number;
    head_shot: string;
    owner: OwnerProps;
}

interface OwnerProps {
    student_id: number;
    student_name: string;
    student_class: string;
    profile_photo: string;
    leader_flg: number | null;
}
interface ProductTypes {
    fashion: ProductList[];
    beauty: ProductList[];
}

export class ProductService {

    public static async getAll() {
        // const res = await ApiClient.get(`${window.location.origin}/api/products/`);
        const res = await ApiClient.get('http://localhost:3000/api/products/');

        const data = {
            fashion: [],
            beauty: [],
        };

        res.fashion.forEach((d: ProductProps) => data.fashion.push(ProductListFactory.createFromJSON(d)));
        res.beauty.forEach((d: ProductProps) => data.beauty.push(ProductListFactory.createFromJSON(d)));

        return data;
    }

    public static async getVotedProducts() {
        // ApiClient.get('/products/vote')
        const array = [];
        // for (let i = 1; i <= 5; i++) {
        //   // array.push(ProductFactory.createFromJSON(await ProductService.get(i)));
        //   const owner = UserFactory.createFromJSON(await UserService.get(i));
        //   const p = new Product(i, `${i}のための〇〇`, owner, `this concept is hogehoge`, PhotoService.buildPhotoPathFromId(i), null, null, null);
        //   array.push(p);
        // }
        return array;
    }

    public static async get(id: number) {
        // const res = await ApiClient.get(`${window.location.origin}/api/products/${id}`)
        const res = await ApiClient.get(`http://localhost:3000/api/products/${id}`);
        const product = ProductFactory.createFromJSON(res);
        return product;
    }
}
