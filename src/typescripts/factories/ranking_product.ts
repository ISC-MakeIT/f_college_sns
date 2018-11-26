import {PhotoService} from '../services/photo';
import { RankingProduct, ProductType, Product} from '../entities';
import { ProductService } from '../services';

export interface RankingJsonProps {
    ranking: number;
    product_id: number;
    entry_order: number;
    vote: number;
}

export class RankingProductFactory {
    public static createFromJSON(p: RankingJsonProps) {
        return new RankingProduct(
            p.ranking,
            p.product_id,
            p.entry_order,
            p.vote,
            // PhotoService.getS3PhotoPath(p.head_shot),
        );
    }

    public static createFromJsonWithProduct(p: RankingJsonProps, product: Product) {
        return new RankingProduct(
            p.ranking,
            p.vote,
            p.product_id,
            p.entry_order,
            product,
            // PhotoService.getS3PhotoPath(p.head_shot),
        );
    }
}
