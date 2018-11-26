import { ApiClient } from '../infrastructure';
import {RankingProductFactory, RankingJsonProps } from '../factories/ranking_product';
import { ProductService } from '../services';
import * as _ from 'lodash';

export class RankingService {
    public static async ranking() {
        const data: any = { fashion: [], beauty: [], voteCount: this.voteCount() };

        data.beauty = await this.createBeautyRanking();
        data.fashion = await this.createFashionRanking();
        return data;
    }

    public static async createBeautyRanking() {
        const data: any[] = [];

        await ProductService.asyncMap(this.info().beauty_ranking, async d => {
            const product = await ProductService.get(d.product_id);
            data.push(RankingProductFactory.createFromJsonWithProduct(d, product));
            _.sortBy(data, 'ranking');
            return;
        });

        return _.sortBy(data, 'ranking');
    }

    public static async createFashionRanking() {
        const data: any[] = [];

        await ProductService.asyncMap(this.info().fashion_ranking, async d => {
            const product = await ProductService.get(d.product_id);
            data.push(RankingProductFactory.createFromJsonWithProduct(d, product));
            _.sortBy(data, 'ranking');
            return;
        });

        return _.sortBy(data, 'ranking');
    }

    public static voteCount() {
        return 2250;
    }

    public static info() {
        return {
            fashion_ranking: [
                { ranking: 1, vote: 92, product_id: 25, entry_order: 4 },
                { ranking: 2, vote: 85, product_id: 23, entry_order: 5 },
                { ranking: 3, vote: 77, product_id: 29, entry_order: 18 },
                { ranking: 4, vote: 63, product_id: 35, entry_order: 8 },
                { ranking: 5, vote: 62, product_id: 32, entry_order: 11 },
                { ranking: 6, vote: 56, product_id: 22, entry_order: 2 },
                { ranking: 7, vote: 52, product_id: 45, entry_order: 21 },
                { ranking: 8, vote: 50, product_id: 38, entry_order: 28 },
                { ranking: 9, vote: 48, product_id: 28, entry_order: 27 },
                { ranking: 10, vote: 47, product_id: 44, entry_order: 30 },
            ],
            beauty_ranking: [
                { ranking: 1, vote: 107, product_id: 12, entry_order: 18 },
                { ranking: 2, vote: 83, product_id: 7, entry_order: 20 },
                { ranking: 3, vote: 78, product_id: 20, entry_order: 17 },
                { ranking: 4, vote: 78, product_id: 5, entry_order: 19 },
                { ranking: 5, vote: 68, product_id: 13, entry_order: 13 },
                { ranking: 6, vote: 66, product_id: 10, entry_order: 10 },
                { ranking: 7, vote: 62, product_id: 8, entry_order: 4 },
                { ranking: 8, vote: 54, product_id: 17, entry_order: 9 },
                { ranking: 9, vote: 52, product_id: 15, entry_order: 7 },
                { ranking: 10, vote: 49, product_id: 2, entry_order: 16 },
            ],
        };
    }
}
