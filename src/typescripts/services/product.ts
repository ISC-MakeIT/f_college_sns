import { Product } from '../entities';
import { ApiClient } from '../infrastructure';
import { ProductFactory, UserFactory } from '../factories';
import { UserService } from './user';

export class ProductService {

    public static async getAll() {
        // APIClient.get('/products')で全てのプロダクトJSONもらいたい
        const array = [];
        for (let i = 0; i < 3; i++) {
            const owner = UserFactory.createFromJSON(await UserService.get(i));
            const p = new Product(
                i,
                `${i}のための〇〇`,
                owner,
                `this concept is hogehoge`,
                `assets/images/${i}`,
                null, null, null);
            array.push(p);
        }
        return array;
    }

    public static async get(id: number) {
        // const ret = ApiClient.get(`api/products/${id}`);
        // const product = ProductFactory.createFromJSON(ret);
        const owner = UserFactory.createFromJSON(await UserService.get(id));
        const product = new Product(
            id,
            '情熱と希望の賛歌',
            owner,
            'このサービスは,情熱をテーマに作成しました。細部までこだわって作成しているのでモデルの手足のその先にある情熱を感じていただけたら幸いです。',
            `public/assets/images/${id}.jpg`,
            [`public/assets/images/${id}.jpg`, `public/assets/images/${id}.jpg`],
            '細部へのこだわりのほか、全体的な配色にもこだわりがあります。正面から見ると妖艶な濃厚な赤を、後ろ姿からは真紅な赤を基調とすることでどこから見ても情熱を感じられるような構成となっています。',
            ['阿部智恵美', '佐々木みなみ', '鍋島恵里奈'],
        );
        return product;
    }
}
