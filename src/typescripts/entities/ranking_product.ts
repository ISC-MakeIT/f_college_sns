import { User } from './';
import { ProductType } from './product';
import { Product } from '../entities';

export class RankingProduct {
    public constructor(
        public ranking: number,
        public productId: number,
        public entryOrder: number,
        public vote: number,
        public product?: Product,
        // public headShot: string,
    ) {}
}
