import {PhotoService} from '../services/photo';
import { RankingProduct, ProductType} from '../entities';

export interface RankingJsonProps {
    entry_order: number;
    genre: ProductType;
    leader_name: string;
    product_id: number;
    ranking: number;
    theme: string;
    vote: number;
}

export class RankingProductFactory {
    public static createFromJSON(p: RankingJsonProps) {
        return new RankingProduct(
            p.entry_order,
            p.genre,
            p.leader_name,
            p.product_id,
            p.ranking,
            p.theme,
            p.vote,
            // PhotoService.getS3PhotoPath(p.head_shot),
        );
    }
}
