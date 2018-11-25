import { User } from './';
import { ProductType } from './product';

export class RankingProduct {
    public constructor(
        public entryOrder: number,
        public genre: ProductType,
        public leader: string,
        public productId: number,
        public ranking: number,
        public theme: string,
        public vote: number,
        // public headShot: string,
    ) {}
}
