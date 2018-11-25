import { ApiClient } from '../infrastructure';
import {RankingProductFactory, RankingJsonProps } from '../factories/ranking_product';

export class RankingService {
    public static async ranking() {
        const res = await ApiClient.get('/ranking');
        const data: any = {fashion: [], beauty: []};
        res[0].fashion_ranking.forEach((d: RankingJsonProps) => data.fashion.push(RankingProductFactory.createFromJSON(d)));
        res[1].beauty_ranking.forEach((d: RankingJsonProps) => data.beauty.push(RankingProductFactory.createFromJSON(d)));

        return data;
    }
}
